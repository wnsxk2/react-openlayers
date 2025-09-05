import React from 'react';
import type { ModalFooterProps } from '../types';
import { modalFooterStyles, footerAlignStyles } from '../styles/modalStyles';

export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className = '',
  align = 'right',
}) => {
  return (
    <div 
      css={[modalFooterStyles, footerAlignStyles[align]]} 
      className={className}
    >
      {children}
    </div>
  );
};