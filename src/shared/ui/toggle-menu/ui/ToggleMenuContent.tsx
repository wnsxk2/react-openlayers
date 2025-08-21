import { colors } from '@/shared/styles';
import { css } from '@emotion/react';
import type { PropsWithChildren } from 'react';

interface ToggleMenuContent extends PropsWithChildren {
  open: boolean;
}

export const ToggleMenuContent = ({ open, children }: ToggleMenuContent) => {
  return (
    <div css={[contentStyles, !open && contentHiddenStyles]}>{children}</div>
  );
};

const contentStyles = css`
  position: absolute;
  right: 0px;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 160px;
  margin-top: 6px;
  background-color: ${colors.white};
  border-radius: 8px;
  border: 1px solid ${colors.borderLight};
  box-shadow: 0 2px 8px ${colors.shadowLight};
  overflow: hidden;
  max-height: 1000px;
  opacity: 1;
  /* 위치를 이동 시켜 자연스럽게 애니메이션 처리 */
  transform: translateY(0);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const contentHiddenStyles = css`
  max-height: 0;
  opacity: 0;
  transform: translateY(-8px);
  border-color: transparent;
  box-shadow: none;
`;
