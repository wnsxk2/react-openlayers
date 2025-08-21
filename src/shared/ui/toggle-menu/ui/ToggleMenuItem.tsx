import { colors } from '@/shared/styles';
import { css } from '@emotion/react';

interface ToggleMenuItem {
  label: string;
  onClick: () => void;
}

export const ToggleMenuItem = ({ label, onClick }: ToggleMenuItem) => {
  return (
    <button css={itemStyles} onClick={onClick}>
      <span>{label}</span>
    </button>
  );
};

const itemStyles = css`
  width: 100%;
  text-align: start;
  padding-left: 8px;
  border-bottom: 1px solid ${colors.borderLight};
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: ${colors.gray100};
  }
  span {
    font-size: 14px;
  }
`;
