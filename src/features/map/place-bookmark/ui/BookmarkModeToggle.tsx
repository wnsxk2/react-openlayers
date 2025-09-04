import { css } from '@emotion/react';
import { colors } from '@/shared/styles';
import { BOOKMARK_CONFIG } from '../constants/bookmark';
import type { BookmarkModeToggleProps } from '../types/bookmark';

/**
 * 북마크 모드 전환 버튼 컴포넌트
 *
 * @param isBookmarkMode - 현재 북마크 모드 여부
 * @param onToggle - 모드 전환 핸들러
 * @param isLoading - 로딩 상태 (선택적)
 */
export const BookmarkModeToggle = ({
  isBookmarkMode,
  onToggle,
  isLoading = false,
}: BookmarkModeToggleProps) => {
  const buttonText = isBookmarkMode ? '×' : BOOKMARK_CONFIG.UI.ADD_BUTTON_TEXT;
  const buttonTitle = isBookmarkMode
    ? '일반 모드로 전환'
    : '북마크 모드로 전환';

  return (
    <button
      css={[toggleButtonStyles]}
      onClick={onToggle}
      disabled={isLoading}
      title={buttonTitle}
      aria-label={buttonTitle}
      type='button'
    >
      {isLoading ? '...' : buttonText}
    </button>
  );
};

const toggleButtonStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid ${colors.borderLight};
  border-radius: 4px;
  background-color: ${colors.white};
  color: ${colors.textSecondary};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    transform: scale(0.95);
  }
`;
