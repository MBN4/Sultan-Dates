'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface ModalContextType {
  isAnyModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  isAnyModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [openCount, setOpenCount] = useState(0);

  const openModal = useCallback(() => setOpenCount((c) => c + 1), []);
  const closeModal = useCallback(() => setOpenCount((c) => Math.max(0, c - 1)), []);

  return (
    <ModalContext.Provider value={{ isAnyModalOpen: openCount > 0, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
