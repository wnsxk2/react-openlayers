import { css } from '@emotion/react';
import { colors } from '@/shared/styles';
import { useState, useCallback } from 'react';
import type { Map } from 'ol';
import { fromLonLat } from 'ol/proj';
import type { Coordinate } from 'ol/coordinate';

import { BOOKMARK_CONFIG } from '../constants/bookmark';
import { BookmarkModal } from './BookmarkModal';
import { BookmarkModeToggle } from './BookmarkModeToggle';
import { BookmarkList } from './BookmarkList';

// 추상화된 훅들
import { useGetBookmark } from '../api/useGetBookmark';
import { usePostBookmark } from '../api/usePostBookmark';
import { useBookmarkMode } from '../hooks/useBookmarkMode';
import { useBookmarkLayer } from '../hooks/useBookmarkLayer';
import { useMapClick } from '../hooks/useMapClick';

// 타입
import type { BookmarkInfo } from '../types/bookmark';

interface BookmarkPanelProps {
  mapInstance: Map | null;
  isMapReady: boolean;
  bookmarkMode: boolean;
  onChangeMode: (value: boolean) => void;
}

/**
 * 리팩토링된 북마크 패널 컴포넌트
 * - 단일 책임 원칙에 따라 로직을 훅으로 분리
 * - UI 컴포넌트를 별도로 분리하여 재사용성 향상
 * - 명확한 데이터 플로우와 에러 처리
 */
export const BookmarkPanel = ({
  mapInstance,
  isMapReady,
  bookmarkMode: isBookmarkMode,
  onChangeMode: setBookmarkMode,
}: BookmarkPanelProps) => {
  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoordinate, setSelectedCoordinate] =
    useState<Coordinate | null>(null);

  // API 훅
  const {
    bookmarkList,
    isLoading: isLoadingBookmarks,
    userFriendlyError: bookmarksError,
  } = useGetBookmark();

  const {
    mutate: createBookmark,
    isPending: isCreatingBookmark,
    userFriendlyError: createError,
  } = usePostBookmark({
    onSuccess: () => {
      setIsModalOpen(false);
      setSelectedCoordinate(null);
    },
    onError: (error) => {
      console.error('북마크 생성 실패:', error);
    },
  });

  // 추상화된 커스텀 훅들
  const { toggleMode } = useBookmarkMode({
    mapInstance,
    isMapReady,
    isBookmarkMode,
    onModeChange: setBookmarkMode,
  });

  // 북마크 레이어 자동 관리 (반환값 사용하지 않음)
  useBookmarkLayer({
    mapInstance,
    isMapReady,
    bookmarks: { type: 'FeatureCollection', features: bookmarkList || [] },
  });

  const { clearLastClick } = useMapClick({
    mapInstance,
    isMapReady,
    isEnabled: isBookmarkMode,
    onMapClick: handleMapClick,
  });

  /**
   * 지도 클릭 핸들러
   */
  function handleMapClick(coordinate: Coordinate) {
    setSelectedCoordinate(coordinate);
    setIsModalOpen(true);
  }

  /**
   * 북마크 생성 핸들러
   */
  const handleCreateBookmark = useCallback(
    (name: string) => {
      if (!selectedCoordinate || name.trim() === '') {
        return;
      }

      createBookmark({
        name: name.trim(),
        coord: selectedCoordinate,
      });
    },
    [selectedCoordinate, createBookmark]
  );

  /**
   * 북마크 클릭 핸들러 (지도 중심 이동)
   */
  const handleBookmarkClick = useCallback(
    (bookmark: BookmarkInfo) => {
      if (!mapInstance) return;

      try {
        const view = mapInstance.getView();
        view.setCenter(fromLonLat(bookmark.center));
        view.setZoom(15); // 적절한 줌 레벨로 설정
      } catch (error) {
        console.error('북마크 위치로 이동 중 오류:', error);
      }
    },
    [mapInstance]
  );

  /**
   * 모달 닫기 핸들러
   */
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedCoordinate(null);
    clearLastClick();
  }, [clearLastClick]);

  return (
    <div css={contentStyles}>
      {/* 북마크 생성 모달 */}
      <BookmarkModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleCreateBookmark}
        confirmText={BOOKMARK_CONFIG.UI.MODAL_CONFIRM_TEXT}
        cancelText={BOOKMARK_CONFIG.UI.MODAL_CANCEL_TEXT}
      />

      {/* 헤더 섹션 */}
      <header css={headerSectionStyles}>
        <h3 css={titleStyles}>{BOOKMARK_CONFIG.UI.TITLE}</h3>

        <BookmarkModeToggle
          isBookmarkMode={isBookmarkMode}
          onToggle={toggleMode}
          isLoading={isCreatingBookmark}
        />
      </header>

      {/* 북마크 목록 */}
      <main css={mainSectionStyles}>
        <BookmarkList
          bookmarks={bookmarkList?.map((bookmark) => bookmark.properties)}
          onBookmarkClick={handleBookmarkClick}
          isLoading={isLoadingBookmarks}
          error={bookmarksError}
        />
      </main>

      {/* 북마크 생성 에러 표시 */}
      {createError && (
        <div css={errorNotificationStyles} role='alert'>
          ⚠️ {createError}
        </div>
      )}
    </div>
  );
};

// 스타일 정의
const contentStyles = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  overflow: hidden;
`;

const headerSectionStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${colors.borderLight};
  flex-shrink: 0;
`;

const titleStyles = css`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin: 0;
`;

const mainSectionStyles = css`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 12px;
`;

const errorNotificationStyles = css`
  padding: 12px;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  font-size: 14px;
  color: #dc2626;
  text-align: center;
  flex-shrink: 0;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
