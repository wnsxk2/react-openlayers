import type { LayerInfo } from '@/entities/map';
import type { Map } from 'ol';
import { useEffect, useMemo, useState } from 'react';
import { useGetPolygon } from '@/features/map/toggle-layer/api/useGetPolygon';
import { LayerFactory } from '@/features/map/toggle-layer/model/services/layerFactory';

interface UseLayerManagerProps {
  mapInstance: Map | null;
  isMapReady: boolean;
  defaultLayers?: LayerInfo[];
}

/**
 * 레이어 상태 관리와 동적 레이어 추가를 담당하는 훅
 */
export function useLayerManager({
  mapInstance,
  isMapReady,
  defaultLayers,
}: UseLayerManagerProps) {
  // 폴리곤 데이터 로드
  const { data: polygon } = useGetPolygon();

  // 기본 레이어 생성
  const baseLayers = useMemo(
    () => defaultLayers || [LayerFactory.createDarkLayer()],
    [defaultLayers]
  );

  // 현재 활성 레이어 관리
  const [currentLayers, setCurrentLayers] = useState<LayerInfo[]>(baseLayers);

  // 폴리곤 데이터가 로드되면 레이어 추가
  useEffect(() => {
    if (polygon) {
      const polygonLayer = LayerFactory.createPolygonLayer(polygon);
      setCurrentLayers((prev) => {
        // 이미 폴리곤 레이어가 있는지 확인
        const hasPolygonLayer = prev.some((layer) => layer.id === 'polygon');
        if (hasPolygonLayer) return prev;

        return [polygonLayer, ...prev];
      });
    }
  }, [polygon]);

  const initialToggleState = useMemo(
    () => currentLayers.reduce((acc, { id }) => ({ ...acc, [id]: false }), {}),
    [currentLayers]
  );

  // 레이어 상태 관리
  const [toggleState, setToggleState] =
    useState<Record<string, boolean>>(initialToggleState);

  // 레이어 상태가 변경될 때마다 초기화
  useEffect(() => {
    setToggleState(initialToggleState);
  }, [initialToggleState]);

  // 맵에 레이어 추가/제거
  useEffect(() => {
    if (!mapInstance || !isMapReady) return;

    // 기존 레이어 제거
    const existingLayers = mapInstance
      .getLayers()
      .getArray()
      .filter((layer) => layer.get('type') === 'toggle');

    existingLayers.forEach((layer) => mapInstance.removeLayer(layer));

    // 새 레이어 추가
    currentLayers.forEach(({ id, layer }) => {
      mapInstance.addLayer(layer(toggleState[id] || false));
    });

    return () => {
      // cleanup 시 레이어 제거
      const layersToRemove = mapInstance
        .getLayers()
        .getArray()
        .filter((layer) => layer.get('type') === 'toggle');

      layersToRemove.forEach((layer) => mapInstance.removeLayer(layer));
    };
  }, [mapInstance, isMapReady, currentLayers, toggleState]);

  const toggleLayer = (id: string, isVisible: boolean) => {
    if (!mapInstance || !isMapReady) return;

    // 맵에서 해당 레이어 찾아서 visibility 변경
    mapInstance
      .getLayers()
      .getArray()
      .forEach((layer) => {
        if (layer.get('id') === id) {
          layer.setVisible(isVisible);
        }
      });

    // 상태 업데이트
    setToggleState((prev) => ({ ...prev, [id]: isVisible }));
  };

  return {
    layers: currentLayers,
    toggleState,
    toggleLayer,
  };
}
