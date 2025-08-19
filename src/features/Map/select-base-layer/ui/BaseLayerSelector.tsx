import { colors } from '@/shared/styles';
import { css, type SerializedStyles } from '@emotion/react';
import type { PropsWithChildren } from 'react';

interface BaseLayerSelectorProps extends PropsWithChildren {
  customCSS?: SerializedStyles;
}

export default function BaseLayerSelector({
  customCSS,
  children,
}: BaseLayerSelectorProps) {
  return <div css={[wrapper, customCSS]}>{children}</div>;
}

const wrapper = css`
  display: flex;
  flex-direction: row;
  z-index: 100;
  padding: 5px;
  gap: 5px;
  position: absolute;
  background-color: ${colors.white};
  border: 1px solid ${colors.borderLight};
  border-radius: 8px;
  box-shadow: 2px 0 8px ${colors.shadowLight};
`;
