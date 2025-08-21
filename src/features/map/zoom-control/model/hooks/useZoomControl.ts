import {
  DEFAULT_ZOOM,
  MAX_ZOOM,
  MIN_ZOOM,
} from '@/features/map/zoom-control/constants';
import { Map } from 'ol';
import { useCallback, useEffect, useState } from 'react';

interface UseZoomControlProps {
  mapInstance: Map | null;
  initialZoom?: number;
  minZoom?: number;
  maxZoom?: number;
}

export function useZoomControl({
  mapInstance,
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
      if (mapInstance) {
        mapInstance.getView().setZoom(value);
      }
    },
    [clampZoom, mapInstance]
  );

  const handleZoomIn = useCallback(() => {
    handleZoomChange(zoom + 1);
  }, [zoom, handleZoomChange]);

  const handleZoomOut = useCallback(() => {
    handleZoomChange(zoom - 1);
  }, [zoom, handleZoomChange]);

  useEffect(() => {
    if (!mapInstance) return;

    const view = mapInstance.getView();
    const handleMapZoomChange = () => {
      const currentZoom = view.getZoom();
      if (currentZoom !== undefined) {
        setZoom(Math.round(currentZoom));
      }
    };

    // 마우스 휠로 해상도가 변경 되었을 때 적용하기 위한 이벤트
    view.on('change:resolution', handleMapZoomChange);

    return () => {
      view.un('change:resolution', handleMapZoomChange);
    };
  }, [mapInstance]);

  return {
    zoom,
    minZoom,
    maxZoom,
    handleZoomChange,
    handleZoomIn,
    handleZoomOut,
  };
}
