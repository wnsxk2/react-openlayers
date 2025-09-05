import { useEffect, useCallback, useState } from 'react';
import type { Map } from 'ol';
import { LayerFactory } from '@/features/map/toggle-layer';
import { BOOKMARK_CONFIG } from '../constants/bookmark';
import type {
  UseBookmarkLayerProps,
  UseBookmarkLayerReturn,
  BookmarkGeoJson,
} from '../types/bookmark';

/**
 * 북마크 레이어 관리 훅
 *
 * @param mapInstance - OpenLayers Map 인스턴스
 * @param isMapReady - 지도 준비 상태
 * @param bookmarks - 북마크 GeoJSON 데이터
 * @returns 레이어 관리 함수들과 상태
 */
export const useBookmarkLayer = ({
  mapInstance,
  isMapReady,
  bookmarks,
}: UseBookmarkLayerProps): UseBookmarkLayerReturn => {
  const [isLayerVisible, setIsLayerVisible] = useState(true);

  /**
   * 기존 북마크 레이어들을 지도에서 제거
   */
  const removeExistingLayers = useCallback(() => {
    if (!mapInstance) return;

    const existingLayers = mapInstance
      .getLayers()
      .getArray()
      .filter((layer) => layer.get('type') === BOOKMARK_CONFIG.LAYER.TYPE);

    existingLayers.forEach((layer) => mapInstance.removeLayer(layer));
  }, [mapInstance]);

  /**
   * 새로운 북마크 레이어를 지도에 추가
   */
  const addBookmarkLayer = useCallback(
    (bookmarkData: BookmarkGeoJson) => {
      if (!mapInstance || !bookmarkData || !bookmarkData.features?.length)
        return;

      const bookmarkLayer = LayerFactory.createBookmarkLayer(bookmarkData);
      mapInstance.addLayer(bookmarkLayer.layer(isLayerVisible));
    },
    [mapInstance, isLayerVisible]
  );

  /**
   * 북마크 레이어를 새로고침 (제거 후 재추가)
   */
  const refreshLayer = useCallback(() => {
    if (!mapInstance || !bookmarks) return;

    removeExistingLayers();
    addBookmarkLayer(bookmarks);
  }, [mapInstance, bookmarks, removeExistingLayers, addBookmarkLayer]);

  /**
   * 레이어 가시성 토글
   */
  const toggleLayerVisibility = useCallback(
    (visible: boolean) => {
      if (!mapInstance) return;

      const bookmarkLayers = mapInstance
        .getLayers()
        .getArray()
        .filter((layer) => layer.get('type') === BOOKMARK_CONFIG.LAYER.TYPE);

      bookmarkLayers.forEach((layer) => {
        layer.setVisible(visible);
      });

      setIsLayerVisible(visible);
    },
    [mapInstance]
  );

  /**
   * 북마크 데이터가 변경될 때마다 레이어 업데이트
   */
  useEffect(() => {
    if (!mapInstance || !isMapReady) return;

    // 기존 레이어 제거
    removeExistingLayers();

    // 새 레이어 추가 (북마크 데이터가 있는 경우에만)
    if (bookmarks) {
      addBookmarkLayer(bookmarks);
    }

    // 컴포넌트 언마운트 시 정리
    return () => {
      removeExistingLayers();
    };
  }, [
    mapInstance,
    isMapReady,
    bookmarks,
    removeExistingLayers,
    addBookmarkLayer,
  ]);

  /**
   * 지도 인스턴스 변경 시 레이어 정리
   */
  useEffect(() => {
    return () => {
      if (mapInstance) {
        removeExistingLayers();
      }
    };
  }, [mapInstance, removeExistingLayers]);

  return {
    isLayerVisible,
    toggleLayerVisibility,
    refreshLayer,
  };
};
