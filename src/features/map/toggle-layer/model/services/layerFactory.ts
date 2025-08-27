import {
  getDarkRasterSource,
  type GetPolygonResponse,
  type LayerInfo,
} from '@/entities/map';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
export class LayerFactory {
  static createDarkLayer(): LayerInfo {
    return {
      id: 'dark',
      label: '다크 레이어',
      layer: (visible: boolean) =>
        new TileLayer({
          source: getDarkRasterSource(),
          visible,
          opacity: 0.7,
          properties: {
            id: 'dark',
            type: 'toggle',
          },
        }),
    };
  }

  static createPolygonLayer(data: GetPolygonResponse): LayerInfo {
    return {
      id: 'polygon',
      label: '폴리곤 레이어',
      layer: (visible: boolean) =>
        new VectorLayer({
          source: new VectorSource({
            features: new GeoJSON().readFeatures(data, {
              dataProjection: 'EPSG:4326',
              featureProjection: 'EPSG:3857',
            }),
          }),
          style: new Style({
            fill: new Fill({
              color: 'rgba(255, 0, 0, 0.2)',
            }),
            stroke: new Stroke({
              color: '#ff0000',
              width: 2,
            }),
          }),
          visible,
          opacity: 0.7,
          zIndex: 1,
          properties: {
            id: 'polygon',
            type: 'toggle',
          },
        }),
    };
  }
}
