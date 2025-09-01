import type { PolygonInfo, PointInfo } from '@/entities/map';
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react';

interface OverlayContextPops {
  // PolygonInfo 속성
  name?: string;
  description?: string;
  category?: string;
  area?: number;
  center?: number[];
  // PointInfo 속성
  locationName?: string;
  type?: '포인트';
  region?: string;
  importance?: '높음' | '보통' | '낮음';
  latitude?: number;
  longitude?: number;
  handleProperties: (properties: PolygonInfo | PointInfo) => void;
}

const OverlayContext = createContext<OverlayContextPops | null>(null);

export const OverlayProvider = ({ children }: PropsWithChildren) => {
  const [properties, setProperties] = useState<PolygonInfo | PointInfo>();

  const handleProperties = (properties: PolygonInfo | PointInfo) => {
    setProperties(properties);
  };

  return (
    <OverlayContext.Provider value={{ ...properties, handleProperties }}>
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlay = () => {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error('useOverlay must be used within a OverlayProvider');
  }
  return context;
};
