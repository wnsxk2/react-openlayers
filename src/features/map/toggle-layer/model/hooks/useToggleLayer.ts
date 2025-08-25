import type { LayerInfo } from '@/entities/map/model/types';
import type { Map } from 'ol';
import { useEffect, useMemo, useState } from 'react';

interface UseToggleLayerProps {
  mapInstance: Map | null;
  isMapReady: boolean;
  initialLayers: LayerInfo[];
}

export function useToggleLayer({
  mapInstance,
  isMapReady,
  initialLayers,
}: UseToggleLayerProps) {
  const { initialToggle } = useMemo(() => {
    const initialToggle = initialLayers.reduce(
      (acc, { id }) => ({ ...acc, [id]: false }),
      {}
    );
    return {
      initialToggle,
    };
  }, [initialLayers]);

  const [toggleLayer, setToggleLayer] =
    useState<Record<string, boolean>>(initialToggle);

  useEffect(() => {
    if (!mapInstance || !isMapReady) return;

    initialLayers.forEach(({ id, layer }) => {
      mapInstance.addLayer(layer(toggleLayer[id] || false));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMapReady, initialLayers]);

  const handleToggleLayer = (id: string, isVisible: boolean) => {
    if (!mapInstance || !isMapReady) return;
    mapInstance
      .getLayers()
      .getArray()
      .forEach((layer) => {
        return layer.get('id') === id ? layer.setVisible(isVisible) : layer;
      });

    setToggleLayer({
      ...toggleLayer,
      [id]: isVisible,
    });
  };

  return {
    layers: initialLayers,
    toggleLayer,
    handleToggleLayer,
  };
}
