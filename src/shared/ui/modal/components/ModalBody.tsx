import React from 'react';
import type { ModalBodyProps } from '../types';
import { modalBodyStyles, scrollableBodyStyles } from '../styles/modalStyles';

export const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  className = '',
  scrollable = false,
}) => {
  return (
    <div 
      css={[modalBodyStyles, scrollable && scrollableBodyStyles]} 
      className={className}
    >
      {children}
    </div>
  );
};