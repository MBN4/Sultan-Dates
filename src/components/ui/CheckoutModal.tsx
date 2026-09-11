'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Landmark, Smartphone, CreditCard, Send, MapPin, Copy, ArrowLeft, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useModal } from '../../context/ModalContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'method' | 'address' | 'payment-info' | 'success';
type PaymentMethod = 'bank' | 'jazzcash' | 'easypaisa';

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cartTotal, deliveryCharge, orderTotal, clearCart } = useCart();
  const { openModal, closeModal } = useModal();
  const [step, setStep] = useState<Step>('method');
  const [method, setMethod] = useState<PaymentMethod | null>(null);
  const [address, setAddress] = useState('');
  const [isCopying, setIsCopying] = useState(false);
  const [selectedBank, setSelectedBank] = useState<'mcb' | 'meezan'>('mcb');
  const [isBankDropdownOpen, setIsBankDropdownOpen] = useState(false);
  const [isBankDropdownOpen2, setIsBankDropdownOpen2] = useState(false);

  useEffect(() => {
    if (isOpen) openModal();
    else closeModal();
    return () => { if (isOpen) closeModal(); };
  }, [isOpen]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopying(true);
    setTimeout(() => setIsCopying(false), 2000);
  };

  const handleNext = () => {
    if (step === 'method') {
      setStep('payment-info');
    } else if (step === 'address' || step === 'payment-info') {
      setStep('success');
      // In success step, we'll clear the cart when the user closes the modal or after a delay
    }
  };

  const handleFinish = () => {
    clearCart();
    onClose();
    // Reset for next time
    setTimeout(() => {
      setStep('method');
      setMethod(null);
      setAddress('');
      setSelectedBank('mcb');
      setIsBankDropdownOpen(false);
      setIsBankDropdownOpen2(false);
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md max-h-[90vh] bg-white rounded-[32px] flex flex-col shadow-2xl border border-stone-100 overflow-hidden"
        >
          {/* Navigation Buttons */}
          <div className="absolute top-4 left-4 md:top-8 md:left-8 flex gap-2 z-10">
            {step === 'payment-info' && (
              <button 
                onClick={() => setStep('method')}
                className="p-2 md:p-3 hover:bg-stone-100 rounded-full transition-colors flex items-center justify-center text-stone-400 hover:text-stone-900 bg-white/80 backdrop-blur-sm"
                title="Go Back"
              >
                <ArrowLeft size={18} className="md:w-5 md:h-5" />
              </button>
            )}
          </div>

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 md:top-8 md:right-8 p-2 md:p-3 hover:bg-stone-100 rounded-full transition-colors z-10 bg-white/80 backdrop-blur-sm"
          >
            <X size={18} className="text-stone-400 md:w-5 md:h-5" />
          </button>

          <div className="pt-16 p-6 md:pt-20 md:p-10 overflow-y-auto flex-grow">
            <AnimatePresence mode="wait">
              {/* Step 1: Method Selection */}
              {step === 'method' && (
                <motion.div
                  key="method"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <span className="text-[9px] font-bold tracking-[0.4em] text-lime uppercase mb-3 block">PAYMENT</span>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mb-6 md:mb-8 italic leading-tight">Choose how <br /> to pay.</h2>
                  
                  <div className="space-y-3 mb-8 md:mb-10">
                    {[
                      { id: 'bank', name: 'Bank Transfer', icon: <Landmark size={20} />, desc: 'Direct bank transfer' },
                      { id: 'jazzcash', name: 'JazzCash', icon: <Smartphone size={20} />, desc: 'Instant mobile wallet transfer' },
                      { id: 'easypaisa', name: 'EasyPaisa', icon: <CreditCard size={20} />, desc: 'Simple digital payments' }
                    ].map((opt) => {
                      const isSelected = method === opt.id;
                      return (
                        <div
                          key={opt.id}
                          className={`w-full rounded-[20px] md:rounded-[24px] border-2 transition-all duration-300 overflow-hidden ${
                            isSelected 
                              ? 'border-lime bg-lime/5' 
                              : 'border-stone-50 hover:border-stone-100 bg-white'
                          }`}
                        >
                          {/* Clickable Header */}
                          <div
                            onClick={() => setMethod(isSelected ? null : (opt.id as PaymentMethod))}
                            className="p-4 md:p-5 text-left flex items-center gap-4 cursor-pointer select-none"
                          >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                              isSelected ? 'bg-lime text-white' : 'bg-stone-50 text-stone-400'
                            }`}>
                              {opt.icon}
                            </div>
                            <div>
                              <div className="font-bold text-stone-900">{opt.name}</div>
                              <div className="text-xs text-stone-500">{opt.desc}</div>
                            </div>
                            {isSelected && (
                              <div className="ml-auto text-lime">
                                <CheckCircle2 size={24} />
                              </div>
                            )}
                          </div>

                          {/* Expanded Content (for Bank Transfer) */}
                          {isSelected && opt.id === 'bank' && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              className="px-4 pb-4 md:px-5 md:pb-5 border-t border-stone-100/50"
                            >
                              <div className="pt-2 space-y-2">
                                <div>
                                  <label className="text-[8px] font-bold text-stone-400 uppercase tracking-widest block mb-1">
                                    Select Bank
                                  </label>
                                  <div className="relative">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setIsBankDropdownOpen(!isBankDropdownOpen);
                                      }}
                                      className="w-full bg-white border border-stone-200 rounded-lg p-2.5 pr-8 text-xs font-bold text-stone-900 text-left flex items-center justify-between transition-all cursor-pointer hover:border-stone-300 focus:outline-none focus:border-lime"
                                    >
                                      <span>{selectedBank === 'mcb' ? 'MCB Bank' : 'Meezan Bank'}</span>
                                      <ChevronDown size={12} className={`text-stone-500 transition-transform duration-200 ${isBankDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                      {isBankDropdownOpen && (
                                        <motion.div
                                          initial={{ opacity: 0, y: -4 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          exit={{ opacity: 0, y: -4 }}
                                          className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-stone-200 rounded-lg shadow-lg overflow-hidden flex flex-col"
                                        >
                                          {[
                                            { id: 'mcb', name: 'MCB Bank' },
                                            { id: 'meezan', name: 'Meezan Bank' }
                                          ].map((bankOpt) => (
                                            <button
                                              key={bankOpt.id}
                                              type="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedBank(bankOpt.id as 'mcb' | 'meezan');
                                                setIsBankDropdownOpen(false);
                                              }}
                                              className={`w-full text-left px-3 py-2 text-xs font-bold transition-colors hover:bg-stone-50 flex items-center justify-between cursor-pointer ${
                                                selectedBank === bankOpt.id ? 'text-lime bg-lime/5' : 'text-stone-700'
                                              }`}
                                            >
                                              <span>{bankOpt.name}</span>
                                              {selectedBank === bankOpt.id && <CheckCircle2 size={12} className="text-lime" />}
                                            </button>
                                          ))}
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </div>

                                {/* Bank details */}
                                <div className="p-2.5 bg-white rounded-lg border border-stone-150 flex items-center justify-between text-[11px]">
                                  <div className="space-y-0.5">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[7.5px] font-bold text-stone-400 uppercase tracking-widest">A/C Number:</span>
                                      <span className="font-mono font-bold text-stone-900">
                                        {selectedBank === 'mcb' ? '0690092291006332' : '02810115162525'}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[7.5px] font-bold text-stone-400 uppercase tracking-widest">A/C Title:</span>
                                      <span className="font-bold text-stone-900">
                                        {selectedBank === 'mcb' ? 'Moon Fatima' : 'Faizan Ahmad'}
                                      </span>
                                    </div>
                                  </div>
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCopy(selectedBank === 'mcb' ? '0690092291006332' : '02810115162525');
                                    }}
                                    className="p-2 bg-stone-50 text-stone-400 hover:text-lime rounded-md transition-colors cursor-pointer flex-shrink-0"
                                  >
                                    {isCopying ? <CheckCircle2 size={12} className="text-lime" /> : <Copy size={12} />}
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <button
                    disabled={!method}
                    onClick={handleNext}
                    className="w-full bg-stone-900 text-white py-6 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-lime transition-all duration-500 disabled:opacity-20 disabled:cursor-not-allowed shadow-xl shadow-stone-900/10"
                  >
                    Continue to Instructions
                  </button>
                </motion.div>
              )}

              {/* Step 2a: Address (COD) */}
              {step === 'address' && (
                <motion.div
                  key="address"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <span className="text-[9px] font-bold tracking-[0.4em] text-lime uppercase mb-3 block">DELIVERY</span>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mb-6 md:mb-8 italic leading-tight">Where should <br /> we harvest?</h2>
                  
                  <div className="relative mb-8 md:mb-10">
                    <MapPin className="absolute top-5 left-5 text-stone-300" size={16} />
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your full delivery address..."
                      className="w-full h-32 bg-stone-50 border-2 border-stone-50 rounded-[20px] md:rounded-[24px] p-5 pl-12 focus:outline-none focus:border-lime transition-all resize-none text-sm text-stone-900"
                    />
                  </div>

                  <div className="mb-6 space-y-2 text-sm">
                    <div className="flex justify-between text-stone-500">
                      <span>Subtotal</span>
                      <span className="font-bold text-stone-900">Rs {cartTotal.toLocaleString('en-US')}</span>
                    </div>
                    <div className="flex justify-between text-stone-500">
                      <span>Delivery Charges</span>
                      <span className="font-bold text-stone-900">Rs {deliveryCharge.toLocaleString('en-US')}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-stone-100 text-stone-900 font-bold">
                      <span>Total</span>
                      <span className="text-lime">Rs {orderTotal.toLocaleString('en-US')}</span>
                    </div>
                    <p className="text-[10px] text-stone-400 leading-relaxed pt-1">
                      A flat delivery charge of Rs. 250 applies to all orders across Pakistan.
                    </p>
                  </div>

                  <button
                    disabled={address.length < 10}
                    onClick={handleNext}
                    className="w-full bg-stone-900 text-white py-6 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-lime transition-all duration-500 disabled:opacity-20 shadow-xl shadow-stone-900/10"
                  >
                    Confirm Order — Rs {orderTotal.toLocaleString('en-US')}
                  </button>
                </motion.div>
              )}

              {/* Step 2b: Payment Info (JazzCash/EasyPaisa) */}
              {step === 'payment-info' && (
                <motion.div
                  key="payment-info"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <span className="text-[9px] font-bold tracking-[0.4em] text-lime uppercase mb-3 block">TRANSFER</span>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mb-6 md:mb-8 italic leading-tight">Finalize your <br /> payment.</h2>
                  
                  <div className="bg-stone-50 rounded-[20px] md:rounded-[24px] p-5 md:p-6 mb-8 md:mb-10 border border-stone-50">
                    <p className="text-xs text-stone-500 mb-5 leading-relaxed">
                      Make the payment and share the screenshot on WhatsApp at <strong className="text-stone-900 font-bold">03283283282</strong> (showing this number) to verify your payment.
                    </p>
                    
                    <div className="space-y-4">
                      {method === 'bank' && (
                        <div className="mb-4">
                          <label className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block mb-2">
                            Select Bank
                          </label>
                          <div className="relative">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsBankDropdownOpen2(!isBankDropdownOpen2);
                              }}
                              className="w-full bg-white border border-stone-200 rounded-2xl p-4 pr-12 text-sm font-bold text-stone-900 text-left flex items-center justify-between transition-all cursor-pointer hover:border-stone-300 focus:outline-none focus:border-lime"
                            >
                              <span>{selectedBank === 'mcb' ? 'MCB Bank' : 'Meezan Bank'}</span>
                              <ChevronDown size={16} className={`text-stone-500 transition-transform duration-200 ${isBankDropdownOpen2 ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                              {isBankDropdownOpen2 && (
                                <motion.div
                                  initial={{ opacity: 0, y: -4 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -4 }}
                                  className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-stone-200 rounded-2xl shadow-lg overflow-hidden flex flex-col"
                                >
                                  {[
                                    { id: 'mcb', name: 'MCB Bank' },
                                    { id: 'meezan', name: 'Meezan Bank' }
                                  ].map((bankOpt) => (
                                    <button
                                      key={bankOpt.id}
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedBank(bankOpt.id as 'mcb' | 'meezan');
                                        setIsBankDropdownOpen2(false);
                                      }}
                                      className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors hover:bg-stone-50 flex items-center justify-between cursor-pointer ${
                                        selectedBank === bankOpt.id ? 'text-lime bg-lime/5' : 'text-stone-700'
                                      }`}
                                    >
                                      <span>{bankOpt.name}</span>
                                      {selectedBank === bankOpt.id && <CheckCircle2 size={14} className="text-lime" />}
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center p-3 md:p-4 bg-white rounded-2xl border border-stone-100">
                        <div>
                          <span className="text-[7px] font-bold text-stone-400 uppercase tracking-widest block mb-0.5">
                            {method === 'bank' ? 'Account Number' : 'EasyPaisa/JazzCash Number'}
                          </span>
                          <span className="text-base md:text-lg font-bold text-stone-900">
                            {method === 'bank' 
                              ? (selectedBank === 'mcb' ? '0690092291006332' : '02810115162525')
                              : '03248444245'
                            }
                          </span>
                        </div>
                        <button 
                          onClick={() => handleCopy(
                            method === 'bank' 
                              ? (selectedBank === 'mcb' ? '0690092291006332' : '02810115162525')
                              : '03248444245'
                          )}
                          className="p-2.5 bg-stone-50 text-stone-400 hover:text-lime rounded-xl transition-colors cursor-pointer"
                        >
                          {isCopying ? <CheckCircle2 size={16} className="text-lime" /> : <Copy size={16} />}
                        </button>
                      </div>

                      <div className="flex justify-between items-center p-3 md:p-4 bg-white rounded-2xl border border-stone-100">
                        <div>
                          <span className="text-[7px] font-bold text-stone-400 uppercase tracking-widest block mb-0.5">
                            Account Title
                          </span>
                          <span className="text-base md:text-lg font-bold text-stone-900">
                            {method === 'bank' 
                              ? (selectedBank === 'mcb' ? 'Moon Fatima' : 'Faizan Ahmad')
                              : 'Moon Fatima'
                            }
                          </span>
                        </div>
                      </div>

                      <div className="p-3 md:p-4 bg-white rounded-2xl border border-stone-100 space-y-1.5">
                        <div className="flex justify-between items-center text-xs text-stone-500">
                          <span>Subtotal</span>
                          <span className="font-bold text-stone-900">Rs {cartTotal.toLocaleString('en-US')}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-stone-500">
                          <span>Delivery Charges</span>
                          <span className="font-bold text-stone-900">Rs {deliveryCharge.toLocaleString('en-US')}</span>
                        </div>
                        <div className="flex justify-between items-center pt-1.5 border-t border-stone-100">
                          <span className="text-[7px] font-bold text-stone-400 uppercase tracking-widest">Total Amount</span>
                          <span className="text-base md:text-lg font-bold text-lime">Rs {orderTotal.toLocaleString('en-US')}</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-stone-400 leading-relaxed">
                        A flat delivery charge of Rs. 250 applies to all orders across Pakistan.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <button
                      onClick={handleNext}
                      className="w-full bg-stone-900 text-white py-6 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-lime transition-all duration-500 shadow-xl shadow-stone-900/10 flex items-center justify-center gap-3"
                    >
                      I've sent the screenshot <Send size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Success */}
              {step === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-24 h-24 bg-lime/10 rounded-full flex items-center justify-center text-lime mx-auto mb-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                    >
                      <CheckCircle2 size={48} />
                    </motion.div>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6 italic leading-tight">Order Received!</h2>
                  <p className="text-stone-500 mb-8 md:mb-12 max-w-xs mx-auto leading-relaxed text-sm md:text-base">
                    Thank you for ordering with Sultan Dates. Your royal harvest of fresh dates will be dispatched with premium packaging.
                  </p>

                  <button
                    onClick={handleFinish}
                    className="w-full bg-[#0D2818] text-white py-6 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-[#4E9200] transition-all duration-500 shadow-xl shadow-stone-900/10"
                  >
                    Back to Sultan Dates
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
