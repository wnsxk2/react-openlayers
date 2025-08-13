import { colors } from '@/shared/styles';
import MenuItem from '@/shared/ui/MenuButton/MenuItem';
import { css } from '@emotion/react';

interface MenuContentProps {
  isOpen: boolean;
}

const labels = ['로그인', '라이트모드', '한국어'];

export default function MenuContent({ isOpen }: MenuContentProps) {
  return (
    <div css={[contentWrapper, !isOpen && contentWrapperHidden]}>
      {labels.map((label) => (
        <MenuItem label={label} onClick={() => {}} />
      ))}
    </div>
  );
}

const contentWrapper = css`
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

const contentWrapperHidden = css`
  max-height: 0;
  opacity: 0;
  transform: translateY(-8px);
  border-color: transparent;
  box-shadow: none;
`;
