'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: number | string;
  name: string;
  price: string;
  image: string;
  quantity: number;
  category?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number | string) => void;
  updateQuantity: (id: number | string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  deliveryCharge: number;
  orderTotal: number;
  cartCount: number;
}

// Flat delivery charge (PKR) applied to every order with at least one item.
export const DELIVERY_CHARGE = 250;

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('sultan_dates_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('sultan_dates_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number | string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number | string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => {
    // Strip any currency label / thousands separators (e.g. "Rs 2,800" -> 2800).
    // Non-priced items ("Call for query") yield NaN and are treated as 0; they
    // are never added to the cart, so they can't affect the total anyway.
    const price = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
    return total + price * item.quantity;
  }, 0);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Delivery applies only when there is something to deliver. `orderTotal` is
  // the authoritative order total (subtotal + delivery) that should be used for
  // the placed order, not just the UI subtotal.
  const deliveryCharge = cart.length > 0 ? DELIVERY_CHARGE : 0;
  const orderTotal = cartTotal + deliveryCharge;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, deliveryCharge, orderTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
