import type { PolygonInfo } from '@/entities/map';
import { useOverlay } from '@/entities/map/ui/OverlayProvider';
import type { Map, MapBrowserEvent } from 'ol';
import { useCallback, useEffect } from 'react';

interface UseMapClickHandlerProps {
  mapInstance: Map | null;
  isMapReady: boolean;
  enabled?: boolean;
}

/**
 * 맵 클릭 이벤트 처리만 담당하는 훅
 */
export function useMapClickHandler({
  mapInstance,
  isMapReady,
  enabled = true,
}: UseMapClickHandlerProps) {
  const { handleProperties } = useOverlay();

  const handleClick = useCallback((e: MapBrowserEvent) => {
    if (!mapInstance) return;

    mapInstance.forEachFeatureAtPixel(
      e.pixel,
      function (feature) {
        const properties = feature.getProperties() as PolygonInfo;
        handleProperties(properties);

        const overlay = mapInstance.getOverlayById('polygon');
        if (overlay) {
          overlay.setPosition(e.coordinate);
        }
      },
      {
        layerFilter: (layer) => {
          return layer.getVisible() && layer.get('id') === 'polygon';
        },
      }
    );
  }, [mapInstance, handleProperties]);

  useEffect(() => {
    if (!mapInstance || !isMapReady || !enabled) return;

    mapInstance.on('click', handleClick);

    return () => {
      mapInstance.un('click', handleClick);
    };
  }, [mapInstance, isMapReady, enabled, handleClick]);

  return {
    handleClick,
  };
}