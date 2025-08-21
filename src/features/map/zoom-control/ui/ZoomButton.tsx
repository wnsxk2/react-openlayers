import { colors } from '@/shared/styles';
import { css } from '@emotion/react';
import type { ReactNode } from 'react';

interface ZoomButtonProps {
  icon: ReactNode;
  disabled: boolean;
  onClick: () => void;
}

export const ZoomButton = ({ icon, disabled, onClick }: ZoomButtonProps) => {
  return (
    <button css={buttonStyles} onClick={onClick} disabled={disabled}>
      {icon}
    </button>
  );
};

const buttonStyles = css`
  height: 100%;
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;

  &:first-of-type {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border-right: 1px solid ${colors.gray300};
  }

  &:last-of-type {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-left: 1px solid ${colors.gray300};
  }

  &:hover:not(:disabled) {
    background-color: ${colors.gray200};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
