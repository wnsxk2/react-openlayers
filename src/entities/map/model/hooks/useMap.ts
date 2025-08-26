import { View, Map } from 'ol';
import { fromLonLat } from 'ol/proj';
import { useEffect, useRef, useState } from 'react';

interface UseMapProps {
  zoom: number;
  center: number[];
}

export const useMap = ({ zoom, center }: UseMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    // div 연결 확인 & 이미 map이 초기화 되었다면 재실행 x
    if (!mapRef.current || mapInstance.current) return;

    // map 초기화
    mapInstance.current = new Map({
      // map을 표출할 element
      target: mapRef.current,
      controls: [],
      layers: [],
      view: new View({
        center: fromLonLat(center),
        zoom: zoom,
      }),
    });

    // map 인스턴스 할당 완료 플래그 설정
    setIsMapReady(true);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.setTarget(undefined);
        mapInstance.current = null;
        setIsMapReady(false);
      }
    };
  }, [zoom, center]);

  return {
    mapRef,
    mapInstance: mapInstance.current,
    isMapReady,
  };
};
