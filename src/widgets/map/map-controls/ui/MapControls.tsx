import { BaseLayerSelector } from '@/features/map/base-layer-select';
import { ZoomControl } from '@/features/map/zoom-control';
import type { Map } from 'ol';

interface MapControlsProps {
  mapInstance: Map | null;
  isMapReady: boolean;
}

export const MapControls = ({ mapInstance, isMapReady }: MapControlsProps) => {
  return (
    <>
      <BaseLayerSelector
        mapInstance={mapInstance}
        isMapReady={isMapReady}
        initialLayer={'normal'}
      />
      <ZoomControl mapInstance={mapInstance} isMapReady={isMapReady} />
    </>
  );
};
