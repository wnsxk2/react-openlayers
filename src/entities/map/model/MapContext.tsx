import useMap from '@/features/Map/model/hooks/useMap';
import type { MapType } from '@/features/Map/model/types';
import type { Map } from 'ol';
import { createContext, type PropsWithChildren } from 'react';

interface MapContextType {
  mapRef: React.RefObject<HTMLDivElement | null>;
  mapInstance: Map | null;
  mapType: MapType;
  setMapType: (type: MapType) => void;
  isMapReady: boolean;
  isDarkRasterVisible: boolean;
  toggleDarkRaster: () => void;
}

const MapContext = createContext<MapContextType | null>(null);

export function MapProvider({ children }: PropsWithChildren) {
  const mapData = useMap();

  return <MapContext.Provider value={mapData}>{children}</MapContext.Provider>;
}

export default MapContext;
