import { BookmarkItem } from '@/features/map/place-bookmark/ui/BookmarkItem';
import { colors } from '@/shared/styles';
import { css } from '@emotion/react';
import type { Map, MapBrowserEvent } from 'ol';
import { fromLonLat, transform } from 'ol/proj';
import { useEffect, useState } from 'react';
import { BookmarkModal } from '@/features/map/place-bookmark/ui/BookmarkModal';
import type { Coordinate } from 'ol/coordinate';
import { useGetBookmark } from '@/features/map/place-bookmark/api/useGetBookmark';
import { LayerFactory } from '@/features/map/toggle-layer';
import { usePostBookmark } from '@/features/map/place-bookmark/api/usePostBookmark';

interface BookmarkPanelProps {
  mapInstance: Map | null;
  isMapReady: boolean;
  bookmarkMode: boolean;
  onChangeMode: (value: boolean) => void;
}

export const BookmarkPanel = ({
  mapInstance,
  isMapReady,
  bookmarkMode: isBookmarkMode,
  onChangeMode: setBookmarkMode,
}: BookmarkPanelProps) => {
  const { data: bookmarks, bookmarkList } = useGetBookmark();
  const createBookmark = usePostBookmark();

  const [toggleState, setToggleState] = useState<Record<string, boolean>>({});
  const [isOpen, setOpen] = useState(false);
  const [coordinate, setCoordinate] = useState<Coordinate | null>(null);

  useEffect(() => {
    if (!mapInstance || !isMapReady) return;
    // 기존 레이어 제거
    const existingLayers = mapInstance
      .getLayers()
      .getArray()
      .filter((layer) => layer.get('type') === 'bookmark');

    existingLayers.forEach((layer) => mapInstance.removeLayer(layer));

    // 새 레이어 추가
    if (bookmarks) {
      mapInstance.addLayer(
        LayerFactory.createBookmarkLayer(bookmarks).layer(true)
      );
    }

    return () => {
      // cleanup 시 레이어 제거
      const layersToRemove = mapInstance
        .getLayers()
        .getArray()
        .filter((layer) => layer.get('type') === 'bookmark');

      layersToRemove.forEach((layer) => mapInstance.removeLayer(layer));
    };
  }, [mapInstance, isMapReady, bookmarks]);

  const handleClick = (e: MapBrowserEvent) => {
    if (!mapInstance) return;
    setCoordinate(transform(e.coordinate, 'EPSG:3857', 'EPSG:4326'));
    setOpen(true);
  };

  useEffect(() => {
    if (!mapInstance || !isMapReady || !isBookmarkMode) return;

    mapInstance.on('click', handleClick);

    return () => {
      mapInstance.un('click', handleClick);
    };
  }, [mapInstance, isMapReady, isBookmarkMode, handleClick]);

  const bookmarkMode = () => {
    if (!mapInstance || !isMapReady) return;

    const initialToggleState: Record<string, boolean> = {};

    // 맵에서 해당 레이어 찾아서 visibility 변경
    mapInstance
      .getLayers()
      .getArray()
      .forEach((layer) => {
        initialToggleState[layer.get('id')] = layer.getVisible();
        if (layer.get('type') === 'toggle') {
          layer.setVisible(false);
        }
      });

    // 상태 업데이트
    setToggleState(initialToggleState);
    setBookmarkMode(true);

    // 지도 클릭 이벤트 추가
  };

  const normalMode = () => {
    if (!mapInstance || !isMapReady) return;

    // 맵에서 해당 레이어 찾아서 visibility 변경
    mapInstance
      .getLayers()
      .getArray()
      .forEach((layer) => {
        if (layer.get('type') === 'toggle') {
          layer.setVisible(toggleState[layer.get('id')] ?? false);
        }
      });

    // 상태 업데이트
    setToggleState({});
    setBookmarkMode(false);
    // 지도 클릭 이벤트 제거
  };

  const handleSubmit = (name: string, coord: Coordinate | null) => {
    if (!coord || name.trim() === '') return;
    // 서버에 저장
    console.log('서버에 저장');
    createBookmark.mutate({ name, coord });
  };

  return (
    <div css={contentStyles}>
      <BookmarkModal
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        onConfirm={(name: string) => {
          handleSubmit(name, coordinate);
        }}
        confirmText='추가'
      />
      <div css={titleSectionStyles}>
        <h3 css={titleStyles}>북마크</h3>
        {/* 버튼 클릭 시 북마크 모드 변경 */}
        <button
          onClick={() => {
            if (isBookmarkMode) {
              normalMode();
            } else {
              bookmarkMode();
            }
          }}
        >
          +
        </button>
      </div>
      {bookmarkList?.map((bookmark) => (
        <BookmarkItem
          key={bookmark.properties.name}
          {...bookmark.properties}
          onClick={() => {
            mapInstance
              ?.getView()
              .setCenter(fromLonLat(bookmark.geometry.coordinates));
          }}
        />
      ))}
    </div>
  );
};

const contentStyles = css`
  padding: 20px;
  overflow-y: auto;
`;

const titleSectionStyles = css`
  margin: 0 0 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${colors.borderLight};
  padding-bottom: 12px;
`;

const titleStyles = css`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.textPrimary};
`;
