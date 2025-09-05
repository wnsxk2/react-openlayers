import React from 'react';
import type { ModalHeaderProps } from '../types';
import { useModalContext } from '../context/ModalContext';
import { modalHeaderStyles, closeButtonStyles } from '../styles/modalStyles';

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  showCloseButton,
  onClose,
  className = '',
}) => {
  const { onClose: contextOnClose } = useModalContext();
  const handleClose = onClose || contextOnClose;
  const shouldShowClose = showCloseButton !== false;

  return (
    <div css={modalHeaderStyles} className={className}>
      <div id="modal-title">{children}</div>
      {shouldShowClose && (
        <button
          type="button"
          css={closeButtonStyles}
          onClick={handleClose}
          aria-label="닫기"
        >
          ×
        </button>
      )}
    </div>
  );
};