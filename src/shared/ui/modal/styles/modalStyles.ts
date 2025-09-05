import { css, keyframes } from '@emotion/react';
import { colors } from '@/shared/styles';
import type { ModalSize } from '../types';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Size configurations
const sizeStyles = {
  sm: css`
    width: 400px;
    max-width: 90vw;
  `,
  md: css`
    width: 500px;
    max-width: 90vw;
  `,
  lg: css`
    width: 700px;
    max-width: 90vw;
  `,
  xl: css`
    width: 900px;
    max-width: 95vw;
  `,
  full: css`
    width: 95vw;
    height: 95vh;
    max-width: none;
    max-height: none;
  `,
};

export const overlayStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.2s ease-out;
`;

export const getModalStyles = (size: ModalSize) => css`
  background: ${colors.white};
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  position: relative;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  ${sizeStyles[size]}

  @media (max-width: 640px) {
    width: 95vw;
    max-height: 95vh;
    margin: 16px;
  }
`;

export const modalHeaderStyles = css`
  padding: 24px 24px 16px 24px;
  border-bottom: 1px solid ${colors.borderLight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-weight: 600;
    color: ${colors.textPrimary};
  }
`;

export const modalBodyStyles = css`
  padding: 24px;
  flex: 1;
  overflow-y: auto;
  color: ${colors.textPrimary};
  line-height: 1.6;
`;

export const scrollableBodyStyles = css`
  max-height: 60vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${colors.gray100};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.gray400};
    border-radius: 3px;

    &:hover {
      background: ${colors.gray500};
    }
  }
`;

export const modalFooterStyles = css`
  padding: 16px 24px 24px 24px;
  border-top: 1px solid ${colors.borderLight};
  display: flex;
  gap: 12px;
  flex-shrink: 0;
`;

export const footerAlignStyles = {
  left: css`
    justify-content: flex-start;
  `,
  center: css`
    justify-content: center;
  `,
  right: css`
    justify-content: flex-end;
  `,
};

export const closeButtonStyles = css`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  color: ${colors.gray500};
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.gray100};
    color: ${colors.gray700};
  }

  &:focus {
    outline: 2px solid ${colors.buttonFocus};
    outline-offset: 2px;
  }
`;

// Button styles for common use cases
export const buttonStyles = {
  primary: css`
    background-color: #3498db;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: #2980b9;
    }

    &:disabled {
      background-color: ${colors.gray300};
      cursor: not-allowed;
    }
  `,
  secondary: css`
    background-color: transparent;
    color: ${colors.gray600};
    border: 1px solid ${colors.gray300};
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: ${colors.gray50};
      border-color: ${colors.gray400};
    }

    &:disabled {
      background-color: ${colors.gray100};
      color: ${colors.gray400};
      cursor: not-allowed;
    }
  `,
  danger: css`
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: #c82333;
    }

    &:focus {
      outline: 2px solid ${colors.buttonFocus};
      outline-offset: 2px;
    }

    &:disabled {
      background-color: ${colors.gray300};
      cursor: not-allowed;
    }
  `,
};
