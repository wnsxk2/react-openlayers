import type { LayerInfo, PolygonInfo } from '@/entities/map';
import { useOverlay } from '@/entities/map/ui/OverlayProvider';
import type { Map, MapBrowserEvent } from 'ol';
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
  const { handleProperties } = useOverlay();
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

    const clickEvent = (e: MapBrowserEvent) => {
      mapInstance.forEachFeatureAtPixel(
        e.pixel,
        function (feature) {
          handleProperties(feature.getProperties() as PolygonInfo);

          const overlay = mapInstance.getOverlayById('polygon');
          if (!overlay) return;
          overlay.setPosition(e.coordinate);
        },
        {
          layerFilter: (layer) => {
            return layer.getVisible();
          },
        }
      );
    };

    mapInstance.on('click', clickEvent);
    return () => {
      initialLayers.forEach(({ id, layer }) => {
        mapInstance.removeLayer(layer(toggleLayer[id] || false));
      });
      mapInstance.un('click', clickEvent);
    };

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
