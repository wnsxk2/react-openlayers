import { css } from '@emotion/react';
import { colors } from '@/shared/styles';
import { BookmarkItem } from './BookmarkItem';
import type { BookmarkListProps } from '../types/bookmark';

/**
 * 북마크 목록 컴포넌트
 *
 * @param bookmarks - 북마크 목록 데이터
 * @param onBookmarkClick - 북마크 클릭 핸들러
 * @param isLoading - 로딩 상태 (선택적)
 * @param error - 에러 메시지 (선택적)
 */
export const BookmarkList = ({
  bookmarks,
  onBookmarkClick,
  isLoading = false,
  error = null,
}: BookmarkListProps) => {
  // 로딩 상태
  if (isLoading) {
    return (
      <div css={loadingContainerStyles}>
        <div css={loadingSpinnerStyles} aria-label='북마크 목록 로딩 중' />
        <p css={loadingTextStyles}>북마크를 불러오는 중...</p>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div css={errorContainerStyles}>
        <p css={errorTextStyles}>⚠️ {error}</p>
        <p css={errorSubTextStyles}>
          페이지를 새로고침하거나 잠시 후 다시 시도해주세요.
        </p>
      </div>
    );
  }

  // 북마크가 없는 상태
  if (!bookmarks || bookmarks.length === 0) {
    return (
      <div css={emptyContainerStyles}>
        <p css={emptyTextStyles}>📍 저장된 북마크가 없습니다</p>
        <p css={emptySubTextStyles}>
          지도에서 위치를 클릭하여 북마크를 추가해보세요.
        </p>
      </div>
    );
  }

  // 북마크 목록 렌더링
  return (
    <div css={listContainerStyles}>
      {bookmarks.map((bookmark, index) => (
        <BookmarkItem
          key={`${bookmark.name}-${index}`}
          name={bookmark.name}
          center={bookmark.center}
          onClick={() => onBookmarkClick(bookmark)}
        />
      ))}
    </div>
  );
};

// 로딩 스타일
const loadingContainerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
`;

const loadingSpinnerStyles = css`
  width: 32px;
  height: 32px;
  border: 3px solid ${colors.borderLight};
  border-top-color: ${colors.borderLight};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const loadingTextStyles = css`
  font-size: 14px;
  color: ${colors.textSecondary};
  margin: 0;
`;

// 에러 스타일
const errorContainerStyles = css`
  padding: 20px;
  text-align: center;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  margin: 10px 0;
`;

const errorTextStyles = css`
  font-size: 14px;
  color: #dc2626;
  font-weight: 500;
  margin: 0 0 8px 0;
`;

const errorSubTextStyles = css`
  font-size: 12px;
  color: #7f1d1d;
  margin: 0;
`;

// 빈 상태 스타일
const emptyContainerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
`;

const emptyTextStyles = css`
  font-size: 16px;
  color: ${colors.textSecondary};
  font-weight: 500;
  margin: 0 0 8px 0;
`;

const emptySubTextStyles = css`
  font-size: 14px;
  color: ${colors.textPrimary || colors.textSecondary};
  margin: 0;
  line-height: 1.4;
`;

// 목록 스타일
const listContainerStyles = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
