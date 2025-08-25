import type { Map } from 'ol';
import type Layer from 'ol/layer/Layer';
import { useEffect, useState } from 'react';

interface UseBaseLayerProps {
  mapInstance: Map | null;
  isMapReady: boolean;
  initialLayer: string;
  initialLayers: {
    id: string;
    label: string;
    layer: (select: string) => Layer;
  }[];
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
    initialLayers.map(({ layer }) => {
      mapInstance.addLayer(layer(selectLayer));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLayers, isMapReady]);

  const handleSelectLayer = (id: string) => {
    if (!mapInstance || !isMapReady) return;
    mapInstance
      .getLayers()
      .getArray()
      .filter((layer) => layer.get('type') === 'base')
      .map((layer) =>
        layer.get('id') === id
          ? layer.setVisible(true)
          : layer.setVisible(false)
      );

    setSelectLayer(id);
  };

  return { layers: initialLayers, selectLayer, handleSelectLayer };
}
