import { useCallback, useEffect, useRef } from 'react';
import Overlay from 'ol/Overlay';
import type { Map, MapBrowserEvent } from 'ol';

interface UseTooltipOverlayProps {
  id: string;
  mapInstance: Map | null;
}

export const useTooltipOverlay = ({
  id,
  mapInstance,
}: UseTooltipOverlayProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  const hideOverlay = useCallback(() => {
    if (!mapInstance) return;
    const overlay = mapInstance.getOverlayById(id);
    if (overlay) {
      overlay.setPosition(undefined);
    }
  }, [mapInstance, id]);

  useEffect(() => {
    if (!mapInstance) return;

    const tooltipElement = tooltipRef.current;
    if (!tooltipElement) return;
    const overlay = new Overlay({
      id,
      element: tooltipElement,
      autoPan: { animation: { duration: 250 } },
    });

    mapInstance.addOverlay(overlay);

    // 빈 공간이나 다른 feature 클릭 시 overlay 숨기기
    const handleMapClick = (e: MapBrowserEvent) => {
      const hasFeatureAtPixel = mapInstance.hasFeatureAtPixel(e.pixel, {
        layerFilter: (layer) => {
          const layerId = layer.get('id');
          return layerId === 'polygon' && layer.getVisible();
        },
      });

      // polygon feature가 없는 곳을 클릭한 경우 overlay 숨기기
      if (!hasFeatureAtPixel) {
        hideOverlay();
      }
    };

    mapInstance.on('click', handleMapClick);

    return () => {
      mapInstance.removeOverlay(overlay);
      mapInstance.un('click', handleMapClick);
    };
  }, [mapInstance, id, hideOverlay]);

  return { tooltipRef, hideOverlay }; // hideOverlay 함수도 반환
};
