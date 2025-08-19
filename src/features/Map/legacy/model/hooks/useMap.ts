import {
  getBaseLayerSource,
  getDarkRasterSource,
} from '@/features/map/legacy/lib/source';
import type { Layers, OverlayLayers } from '@/features/map/legacy/model/types';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import { useCallback, useEffect, useRef, useState } from 'react';

interface UseMapReturn {
  mapRef: React.RefObject<HTMLDivElement | null>;
  mapInstance: Map | null;
  mapType: string;
  setMapType: (type: string) => void;
  isMapReady: boolean;
  isDarkRasterVisible: boolean;
  toggleDarkRaster: () => void;
}

export default function useMap(): UseMapReturn {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const layersRef = useRef<Layers | null>(null);
  const overlayLayersRef = useRef<OverlayLayers | null>(null);

  const [mapType, setCurrentMapType] = useState<string>('normal');
  const [isMapReady, setIsMapReady] = useState(false);
  const [isDarkRasterVisible, setIsDarkRasterVisible] = useState(false);

  // Map 초기화
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const normalLayer = new TileLayer({
      source: getBaseLayerSource('normal'),
      visible: mapType === 'normal',
    });

    const satelliteLayer = new TileLayer({
      source: getBaseLayerSource('satellite'),
      visible: mapType === 'satellite',
    });

    const terrainLayer = new TileLayer({
      source: getBaseLayerSource('terrain'),
      visible: mapType === 'terrain',
    });

    const darkRasterLayer = new TileLayer({
      source: getDarkRasterSource(),
      visible: false,
      opacity: 0.7,
    });

    overlayLayersRef.current = {
      darkRaster: darkRasterLayer,
    };

    layersRef.current = {
      normal: normalLayer,
      satellite: satelliteLayer,
      terrain: terrainLayer,
    };

    mapInstanceRef.current = new Map({
      target: mapRef.current,
      controls: [],
      layers: [normalLayer, satelliteLayer, terrainLayer, darkRasterLayer],
      view: new View({
        center: fromLonLat([126.9779, 37.5663]),
        zoom: 12,
      }),
    });

    setIsMapReady(true);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
      layersRef.current = null;
      overlayLayersRef.current = null;
      setIsMapReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Map 타입 변경 함수
  const setMapType = useCallback((newType: string) => {
    setCurrentMapType(newType);

    if (!layersRef.current) return;

    // 모든 레이어를 숨김
    Object.values(layersRef.current).forEach((layer) => {
      layer.setVisible(false);
    });

    // 선택된 레이어만 표시
    layersRef.current[newType].setVisible(true);
  }, []);

  const toggleDarkRaster = () => {
    if (!overlayLayersRef.current) return;

    const newVisibility = !isDarkRasterVisible;
    overlayLayersRef.current.darkRaster.setVisible(newVisibility);
    setIsDarkRasterVisible(newVisibility);
  };

  return {
    mapRef,
    mapInstance: mapInstanceRef.current,
    mapType,
    setMapType,
    isMapReady,
    isDarkRasterVisible,
    toggleDarkRaster,
  };
}
