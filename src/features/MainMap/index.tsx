import type { MapType } from '@/pages/Map';
import { css } from '@emotion/react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import { OSM, XYZ } from 'ol/source';
import { useEffect, useRef, type PropsWithChildren } from 'react';

// 지도 타입별 베이스 레이어 소스 정의
const getBaseLayerSource = (mapType: MapType) => {
  switch (mapType) {
    case 'normal':
      // 기본 OpenStreetMap
      return new OSM();

    case 'satellite':
      // 위성 이미지 - Esri World Imagery (고해상도)
      return new XYZ({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attributions:
          '© Esri, Maxar, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, GIS User Community',
        maxZoom: 19,
        crossOrigin: 'anonymous',
      });

    case 'terrain':
      // 지형도 - OpenTopoMap (등고선과 지형 정보가 풍부)
      return new XYZ({
        url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png',
        attributions:
          '© OpenTopoMap (CC-BY-SA), Map data © OpenStreetMap contributors',
        maxZoom: 17,
        crossOrigin: 'anonymous',
      });

    default:
      return new OSM();
  }
};

interface MainMapProps extends PropsWithChildren {
  mapType: MapType;
}

export default function MainMap({ mapType, children }: MainMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const layersRef = useRef<{
    normal: TileLayer;
    satellite: TileLayer;
    terrain: TileLayer;
  } | null>(null);

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

    layersRef.current = {
      normal: normalLayer,
      satellite: satelliteLayer,
      terrain: terrainLayer,
    };

    mapInstanceRef.current = new Map({
      target: mapRef.current,
      controls: [],
      layers: [normalLayer, satelliteLayer, terrainLayer],
      view: new View({
        center: fromLonLat([126.9779, 37.5663]),
        zoom: 12,
      }),
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!layersRef.current) return;

    // 모든 레이어를 숨김
    Object.values(layersRef.current).forEach((layer) => {
      layer.setVisible(false);
    });

    // 선택된 레이어만 표시
    layersRef.current[mapType].setVisible(true);
  }, [mapType]);

  return (
    <div css={mapWrapper}>
      <div css={mapElement} ref={mapRef} />
      {children}
    </div>
  );
}

const mapWrapper = css`
  overflow: hidden;
  flex: 1;
  position: relative;
`;

const mapElement = css`
  width: 100%;
  height: 100%;
`;
