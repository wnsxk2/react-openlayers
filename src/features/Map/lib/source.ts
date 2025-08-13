import type { MapType } from '@/features/Map/model/types';
import { OSM, XYZ } from 'ol/source';

// 지도 타입별 베이스 레이어 소스 정의
export const getBaseLayerSource = (mapType: MapType) => {
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
