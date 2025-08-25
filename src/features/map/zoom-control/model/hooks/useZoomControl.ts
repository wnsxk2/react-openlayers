import {
  DEFAULT_ZOOM,
  MAX_ZOOM,
  MIN_ZOOM,
} from '@/features/map/zoom-control/constants';
import { Map } from 'ol';
import { useCallback, useEffect, useState } from 'react';

interface UseZoomControlProps {
  mapInstance: Map | null;
  isMapReady: boolean;
  initialZoom?: number;
  minZoom?: number;
  maxZoom?: number;
}

export function useZoomControl({
  mapInstance,
  isMapReady,
  initialZoom = DEFAULT_ZOOM,
  minZoom = MIN_ZOOM,
  maxZoom = MAX_ZOOM,
}: UseZoomControlProps) {
  const [zoom, setZoom] = useState(initialZoom);

  const clampZoom = useCallback(
    (value: number) => {
      return Math.max(minZoom, Math.min(maxZoom, value));
    },
    [minZoom, maxZoom]
  );

  const handleZoomChange = useCallback(
    (value: number) => {
      const clampedValue = clampZoom(value);
      setZoom(clampedValue);
      if (mapInstance && isMapReady) {
        const view = mapInstance.getView();
        if (view) {
          view.setZoom(clampedValue);
        }
      }
    },
    [clampZoom, isMapReady]
  );

  const handleZoomIn = useCallback(() => {
    handleZoomChange(zoom + 1);
  }, [zoom, handleZoomChange]);

  const handleZoomOut = useCallback(() => {
    handleZoomChange(zoom - 1);
  }, [zoom, handleZoomChange]);

  useEffect(() => {
    if (!mapInstance || !isMapReady) return;

    const view = mapInstance.getView();
    if (!view) return;

    const handleMapZoomChange = () => {
      const currentZoom = view.getZoom();
      if (currentZoom !== undefined) {
        setZoom(Math.round(currentZoom));
      }
    };

    // 마우스 휠로 해상도가 변경 되었을 때 적용하기 위한 이벤트
    view.on('change:resolution', handleMapZoomChange);

    // 초기 줌 레벨 동기화
    const initialCurrentZoom = view.getZoom();
    if (initialCurrentZoom !== undefined) {
      setZoom(Math.round(initialCurrentZoom));
    }

    return () => {
      view.un('change:resolution', handleMapZoomChange);
    };
  }, [isMapReady]);

  return {
    zoom,
    minZoom,
    maxZoom,
    handleZoomChange,
    handleZoomIn,
    handleZoomOut,
  };
}
