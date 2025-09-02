import React from 'react';
import { Modal } from './Modal';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import { buttonStyles } from '../styles/modalStyles';

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'warning' | 'error';
  size?: 'sm' | 'md';
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = '확인',
  cancelText = '취소',
  variant = 'default',
  size = 'sm',
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      variant={variant}
      closeOnOverlayClick={false}
    >
      <ModalHeader showCloseButton={false}>
        <h3>{title}</h3>
      </ModalHeader>
      <ModalBody>
        <p>{message}</p>
      </ModalBody>
      <ModalFooter>
        <button css={buttonStyles.secondary} onClick={onClose}>
          {cancelText}
        </button>
        <button 
          css={variant === 'error' ? buttonStyles.danger : buttonStyles.primary} 
          onClick={handleConfirm}
        >
          {confirmText}
        </button>
      </ModalFooter>
    </Modal>
  );
};