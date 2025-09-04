import { useEffect, useCallback, useState } from 'react';
import type { MapBrowserEvent } from 'ol';
import type { Coordinate } from 'ol/coordinate';
import { transform } from 'ol/proj';
import { BOOKMARK_CONFIG } from '../constants/bookmark';
import type { UseMapClickProps, UseMapClickReturn } from '../types/bookmark';

/**
 * 지도 클릭 이벤트 처리 훅
 *
 * @param mapInstance - OpenLayers Map 인스턴스
 * @param isMapReady - 지도 준비 상태
 * @param isEnabled - 클릭 이벤트 활성화 여부
 * @param onMapClick - 클릭 시 호출될 콜백 함수
 * @returns 클릭 관련 상태와 유틸리티 함수들
 */
export const useMapClick = ({
  mapInstance,
  isMapReady,
  isEnabled,
  onMapClick,
}: UseMapClickProps): UseMapClickReturn => {
  const [lastClickedCoordinate, setLastClickedCoordinate] =
    useState<Coordinate | null>(null);

  /**
   * 지도 클릭 이벤트 핸들러
   */
  const handleMapClick = useCallback(
    (event: MapBrowserEvent) => {
      if (!mapInstance || !isEnabled) return;

      try {
        // Web Mercator에서 WGS84로 좌표 변환
        const transformedCoordinate = transform(
          event.coordinate,
          BOOKMARK_CONFIG.PROJECTION.SOURCE, // EPSG:3857
          BOOKMARK_CONFIG.PROJECTION.TARGET // EPSG:4326
        );

        setLastClickedCoordinate(transformedCoordinate);
        onMapClick(transformedCoordinate);
      } catch (error) {
        console.error('좌표 변환 중 오류 발생:', error);
        // 원본 좌표라도 전달하여 기능이 중단되지 않도록 함
        setLastClickedCoordinate(event.coordinate);
        onMapClick(event.coordinate);
      }
    },
    [mapInstance, isEnabled, onMapClick]
  );

  /**
   * 마지막 클릭 좌표 초기화
   */
  const clearLastClick = useCallback(() => {
    setLastClickedCoordinate(null);
  }, []);

  /**
   * 지도 클릭 이벤트 리스너 등록/해제
   */
  useEffect(() => {
    if (!mapInstance || !isMapReady || !isEnabled) {
      return;
    }

    // 클릭 이벤트 리스너 등록
    mapInstance.on('click', handleMapClick);

    // 정리 함수: 이벤트 리스너 해제
    return () => {
      mapInstance.un('click', handleMapClick);
    };
  }, [mapInstance, isMapReady, isEnabled, handleMapClick]);

  /**
   * 컴포넌트 언마운트 시 이벤트 리스너 정리
   */
  useEffect(() => {
    return () => {
      if (mapInstance) {
        mapInstance.un('click', handleMapClick);
      }
    };
  }, [mapInstance, handleMapClick]);

  return {
    lastClickedCoordinate,
    clearLastClick,
  };
};
