import React, { createContext, useContext } from 'react';
import type { ModalContextType, ModalSize, ModalVariant } from '../types';

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal compound components must be used within Modal component');
  }
  return context;
};

interface ModalProviderProps {
  children: React.ReactNode;
  value: ModalContextType;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({
  children,
  value,
}) => {
  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};