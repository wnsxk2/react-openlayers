import { colors } from '@/shared/styles';
import { css } from '@emotion/react';

interface LayerToggleBtnProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export default function LayerToggleBtn({
  label,
  checked,
  onChange,
}: LayerToggleBtnProps) {
  return (
    <div css={layerCheckSection}>
      <label css={checkboxLabel}>
        <input
          type='checkbox'
          checked={checked}
          onChange={onChange}
          css={layersCheckbox}
        />
        <span css={checkboxText}>{label}</span>
      </label>
    </div>
  );
}
const layerCheckSection = css`
  margin-bottom: 24px;
`;

const checkboxLabel = css`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 0;

  &:hover {
    background-color: ${colors.gray50};
    border-radius: 4px;
    padding-left: 8px;
    padding-right: 8px;
  }
`;

const layersCheckbox = css`
  margin-right: 12px;
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const checkboxText = css`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.textSecondary};
  user-select: none;
`;
