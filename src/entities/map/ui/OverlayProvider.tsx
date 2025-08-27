import type { PolygonInfo } from '@/entities/map';
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react';

interface OverlayContextPops {
  name?: string;
  description?: string;
  category?: string;
  area?: number;
  center?: number[];
  handleProperties: (properties: PolygonInfo) => void;
}

const OverlayContext = createContext<OverlayContextPops | null>(null);

export const OverlayProvider = ({ children }: PropsWithChildren) => {
  const [properties, setProperties] = useState<PolygonInfo>();

  const handleProperties = (properties: PolygonInfo) => {
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
