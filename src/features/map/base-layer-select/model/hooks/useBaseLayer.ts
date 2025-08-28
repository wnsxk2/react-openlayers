import type { LayerInfo } from '@/entities/map';
import type { Map } from 'ol';
import { useEffect, useState } from 'react';

interface UseBaseLayerProps {
  mapInstance: Map | null;
  isMapReady: boolean;
  initialLayer: string;
  initialLayers: LayerInfo[];
}

export default function useBaseLayer({
  mapInstance,
  isMapReady,
  initialLayer = 'normal',
  initialLayers,
}: UseBaseLayerProps) {
  const [selectLayer, setSelectLayer] = useState(initialLayer);

  useEffect(() => {
    if (!mapInstance || !isMapReady) return;
    initialLayers.forEach(({ id, layer }) => {
      mapInstance.addLayer(layer(id === selectLayer));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLayers, isMapReady]);

  const handleSelectLayer = (id: string) => {
    if (!mapInstance || !isMapReady) return;
    mapInstance
      .getLayers()
      .getArray()
      .filter((layer) => layer.get('type') === 'base')
      .forEach((layer) =>
        layer.get('id') === id
          ? layer.setVisible(true)
          : layer.setVisible(false)
      );

    setSelectLayer(id);
  };

  return { layers: initialLayers, selectLayer, handleSelectLayer };
}
