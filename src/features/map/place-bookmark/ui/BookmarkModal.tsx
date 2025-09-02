import { colors } from '@/shared/styles';
import {
  buttonStyles,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@/shared/ui/modal';
import { css } from '@emotion/react';
import React, { useState, type ChangeEvent } from 'react';

export interface BookmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string) => void;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'warning' | 'error';
  size?: 'sm' | 'md';
}

export const BookmarkModal: React.FC<BookmarkModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  confirmText = '확인',
  cancelText = '취소',
  variant = 'default',
  size = 'sm',
}) => {
  const [input, setInput] = useState({ name: '' });

  const handleConfirm = () => {
    onConfirm(input.name);
    setInput({ name: '' });
    onClose();
  };

  const handleOnChnage = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
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
        <h3>북마크 추가</h3>
      </ModalHeader>
      <ModalBody>
        <div css={modalContainerStyles}>
          <p>북마크 명 : </p>
          <input
            type='text'
            name='name'
            value={input.name}
            onChange={handleOnChnage}
          />
        </div>
        <p>이 위치를 북마크에 추가하시겠습니까?</p>
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

const modalContainerStyles = css`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-bottom: 12px;
  & > input {
    border: 0.5px solid ${colors.borderLight};
    border-radius: 8px;
    padding: 4px 8px;
  }
`;
