import type { PolygonInfo, PointInfo } from '@/entities/map';
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

    // 먼저 모든 툴팁을 숨김
    const polygonOverlay = mapInstance.getOverlayById('polygon');
    const pointOverlay = mapInstance.getOverlayById('point');
    if (polygonOverlay) polygonOverlay.setPosition(undefined);
    if (pointOverlay) pointOverlay.setPosition(undefined);

    let featureFound = false;

    mapInstance.forEachFeatureAtPixel(
      e.pixel,
      function (feature, layer) {
        if (featureFound) return; // 이미 feature를 찾았으면 종료
        
        const layerId = layer.get('id');
        if (layerId !== 'polygon' && layerId !== 'point') return;
        
        const properties = feature.getProperties() as PolygonInfo | PointInfo;
        
        // properties에 실제 데이터가 있는지 확인
        if (layerId === 'polygon' && 'name' in properties && properties.name) {
          handleProperties(properties);
          const overlay = mapInstance.getOverlayById('polygon');
          if (overlay) {
            overlay.setPosition(e.coordinate);
          }
          featureFound = true;
        } else if (layerId === 'point' && 'locationName' in properties && properties.locationName) {
          handleProperties(properties);
          const overlay = mapInstance.getOverlayById('point');
          if (overlay) {
            overlay.setPosition(e.coordinate);
          }
          featureFound = true;
        }
      },
      {
        layerFilter: (layer) => {
          return layer.getVisible() && (layer.get('id') === 'polygon' || layer.get('id') === 'point');
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