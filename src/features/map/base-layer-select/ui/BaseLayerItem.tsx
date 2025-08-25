import { colors } from '@/shared/styles';
import { css } from '@emotion/react';

interface BaseLayerItemProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export const BaseLayerItem = ({
  label,
  selected,
  onClick,
}: BaseLayerItemProps) => {
  return (
    <button
      css={baseLayerSelectBtn({
        isActive: selected,
      })}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const baseLayerSelectBtn = ({ isActive }: { isActive: boolean }) => css`
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
