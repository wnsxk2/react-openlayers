import { colors } from '@/shared/styles';
import { css } from '@emotion/react';

interface MenuItemProps {
  label: string;
  onClick: () => void;
}

export default function MenuItem({ label, onClick }: MenuItemProps) {
  return (
    <button css={button} onClick={onClick}>
      <span>{label}</span>
    </button>
  );
}

const button = css`
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
