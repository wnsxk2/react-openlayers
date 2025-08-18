import { createContext, useContext, type ReactNode } from 'react';
import useMap from '@/features/Map/model/hooks/useMap';
import type { MapType } from '@/features/Map/model/types';
import { Map } from 'ol';

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

export function MapProvider({ children }: { children: ReactNode }) {
  const mapData = useMap();

  return <MapContext.Provider value={mapData}>{children}</MapContext.Provider>;
}

export function useMapContext() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('변경 중 오류가 발생했습니다.');
  }
  return context;
}
