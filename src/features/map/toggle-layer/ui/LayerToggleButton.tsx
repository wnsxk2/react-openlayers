import { colors } from '@/shared/styles';
import { css } from '@emotion/react';

interface LayerToggleButtonProps {
  name: string;
  label: string;
  value: boolean;
  onChange: (id: string, isVisible: boolean) => void;
}

export function LayerToggleButton({
  name,
  label,
  value,
  onChange,
}: LayerToggleButtonProps) {
  return (
    <label css={containerStyles}>
      <input
        css={checkboxStyles}
        name={name}
        type='checkbox'
        checked={value}
        onChange={(e) => {
          onChange(e.target.name, e.target.checked);
        }}
      />
      <span css={checkboxTextStyles}>{label}</span>
    </label>
  );
}

const containerStyles = css`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px;

  &:hover {
    background-color: ${colors.gray50};
    border-radius: 4px;
  }
`;

const checkboxStyles = css`
  margin-right: 12px;
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const checkboxTextStyles = css`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.textSecondary};
  user-select: none;
`;
