import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { ModalProps } from '../types';
import { ModalProvider } from '../context/ModalContext';
import { useKeyboardHandler, useFocusTrap } from '../hooks/useModal';
import { overlayStyles, getModalStyles } from '../styles/modalStyles';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  size = 'md',
  variant = 'default',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = '',
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useKeyboardHandler(isOpen, onClose, closeOnEscape);
  useFocusTrap(isOpen, modalRef);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalElement = (
    <div css={overlayStyles} onClick={handleOverlayClick}>
      <div
        ref={modalRef}
        css={[getModalStyles(size)]}
        className={className}
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-title'
      >
        <ModalProvider
          value={{
            isOpen,
            onClose,
            size,
            variant,
          }}
        >
          {children}
        </ModalProvider>
      </div>
    </div>
  );

  return createPortal(modalElement, document.body);
};
