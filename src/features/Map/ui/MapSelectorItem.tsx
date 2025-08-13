import type { MapType } from '@/features/Map/model/types';
import { colors } from '@/shared/styles';
import { css } from '@emotion/react';

interface ItemPops {
  isActive: boolean;
  type?: MapType;
  label: string;
  onClick: () => void;
}

export default function MapSelectorItem({
  isActive,
  label,
  onClick,
}: ItemPops) {
  return (
    <button css={button({ isActive })} onClick={onClick}>
      {label}
    </button>
  );
}

const button = ({ isActive }: { isActive: boolean }) => css`
  font-size: 14px;
  border-radius: 4px;
  padding: 8px 16px;
  transition: background-color 0.2s ease-in;

  ${!isActive &&
  css`
    &:hover {
      background-color: ${colors.buttonHover};
    }
  `}

  ${isActive &&
  css`
    font-weight: 500;
    color: ${colors.white};
    background-color: ${colors.buttonFocus};
  `}
`;
