import { getBaseLayerSource } from '@/entities/map';
import { Global, css } from '@emotion/react';
import type { Map } from 'ol';
import OverviewMap from 'ol/control/OverviewMap';
import TileLayer from 'ol/layer/Tile';
import { useEffect } from 'react';

interface OverviewMapProps {
  mapInstance: Map | null;
  isMapReady: boolean;
}

export const OverviewMapControl = ({
  mapInstance,
  isMapReady,
}: OverviewMapProps) => {
  useEffect(() => {
    if (!mapInstance || !isMapReady) return;

    const overviewMapControl = new OverviewMap({
      layers: [
        new TileLayer({
          source: getBaseLayerSource('normal'),
        }),
      ],
      collapsed: false,
      collapsible: false,
      className: 'custom-overview',
    });

    mapInstance.addControl(overviewMapControl);

    return () => {
      mapInstance.removeControl(overviewMapControl);
    };
  }, [mapInstance, isMapReady]);

  return (
    <Global
      styles={css`
        .custom-overview {
          position: absolute !important;
          bottom: 15px !important;
          left: 15px !important;
          top: auto !important;
          right: auto !important;
          background: rgba(255, 255, 255, 0.8) !important;
          border: 4px solid #ffffff !important;
          border-radius: 4px !important;
        }
        .custom-overview .ol-overviewmap-map {
          width: 180px !important;
          height: 140px !important;
          border: 1px solid white !important;
        }
        .custom-overview .ol-layers {
          display: block !important;
        }
        .custom-overview button {
          display: none !important;
        }
      `}
    />
  );
};
