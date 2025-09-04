import { useCallback, useState, useEffect } from 'react';
import type { Map } from 'ol';
import { BOOKMARK_MODE } from '../constants/bookmark';
import type { BookmarkMode, UseBookmarkModeReturn } from '../types/bookmark';

interface UseBookmarkModeProps {
  mapInstance: Map | null;
  isMapReady: boolean;
  isBookmarkMode?: boolean;
  onModeChange?: (mode: boolean) => void;
}

/**
 * 북마크 모드 전환 및 레이어 가시성 관리 훅
 * 
 * @param mapInstance - OpenLayers Map 인스턴스
 * @param isMapReady - 지도 준비 상태
 * @returns 모드 상태와 전환 함수들
 */
export const useBookmarkMode = ({ 
  mapInstance, 
  isMapReady,
  isBookmarkMode: externalMode,
  onModeChange
}: UseBookmarkModeProps): UseBookmarkModeReturn => {
  const [mode, setMode] = useState<BookmarkMode>(BOOKMARK_MODE.NORMAL);
  const [layerVisibility, setLayerVisibility] = useState<Record<string, boolean>>({});

  const isBookmarkMode = externalMode ?? (mode === BOOKMARK_MODE.BOOKMARK);

  // 외부 모드 변경에 따른 동기화
  useEffect(() => {
    if (externalMode !== undefined) {
      const targetMode = externalMode ? BOOKMARK_MODE.BOOKMARK : BOOKMARK_MODE.NORMAL;
      if (mode !== targetMode) {
        setMode(targetMode);
      }
    }
  }, [externalMode, mode]);

  /**
   * 북마크 모드로 전환
   * - 토글 레이어들을 숨김
   * - 현재 가시성 상태를 저장
   */
  const setBookmarkMode = useCallback(() => {
    if (!mapInstance || !isMapReady) return;

    const initialToggleState: Record<string, boolean> = {};

    // 토글 레이어들의 현재 상태를 저장하고 숨김
    mapInstance
      .getLayers()
      .getArray()
      .forEach((layer) => {
        const layerId = layer.get('id');
        const layerType = layer.get('type');
        
        if (layerId) {
          initialToggleState[layerId] = layer.getVisible();
        }
        
        if (layerType === 'toggle') {
          layer.setVisible(false);
        }
      });

    setLayerVisibility(initialToggleState);
    setMode(BOOKMARK_MODE.BOOKMARK);
    
    if (onModeChange) {
      onModeChange(true);
    }
  }, [mapInstance, isMapReady, onModeChange]);

  /**
   * 일반 모드로 전환
   * - 이전에 저장된 레이어 가시성 상태 복원
   */
  const setNormalMode = useCallback(() => {
    if (!mapInstance || !isMapReady) return;

    // 토글 레이어들의 가시성을 이전 상태로 복원
    mapInstance
      .getLayers()
      .getArray()
      .forEach((layer) => {
        const layerId = layer.get('id');
        const layerType = layer.get('type');
        
        if (layerType === 'toggle' && layerId) {
          layer.setVisible(layerVisibility[layerId] ?? false);
        }
      });

    setLayerVisibility({});
    setMode(BOOKMARK_MODE.NORMAL);
    
    if (onModeChange) {
      onModeChange(false);
    }
  }, [mapInstance, isMapReady, layerVisibility, onModeChange]);

  /**
   * 모드 토글 (북마크 ↔ 일반)
   */
  const toggleMode = useCallback(() => {
    if (isBookmarkMode) {
      setNormalMode();
    } else {
      setBookmarkMode();
    }
  }, [isBookmarkMode, setNormalMode, setBookmarkMode]);

  return {
    mode,
    isBookmarkMode,
    toggleMode,
    setNormalMode,
    setBookmarkMode,
    layerVisibility,
  };
};