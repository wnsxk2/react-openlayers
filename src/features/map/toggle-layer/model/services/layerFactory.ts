import {
  getElevationRasterSource,
  type GetPolygonResponse,
  type GetPointResponse,
  type LayerInfo,
  getRasterSource,
} from '@/entities/map';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import CircleStyle from 'ol/style/Circle';
import type { GetBookmarksResponse } from '@/entities/map/api/bookmark';
export class LayerFactory {
  static createDarkLayer(): LayerInfo {
    return {
      id: 'dark',
      label: '다크 레이어',
      layer: (visible: boolean) =>
        new TileLayer({
          source: getRasterSource('dark'),
          visible,
          opacity: 0.7,
          properties: {
            id: 'dark',
            type: 'toggle',
          },
        }),
    };
  }

  static createElevationLayer(): LayerInfo {
    return {
      id: 'elevation',
      label: '지형고도 레이어',
      layer: (visible: boolean) =>
        new TileLayer({
          source: getElevationRasterSource(),
          visible,
          opacity: 0.8,
          properties: {
            id: 'elevation',
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

  static createPointLayer(data: GetPointResponse): LayerInfo {
    // Geometry<PointInfo>[]를 GeoJSON 형태로 변환
    const geoJsonData = {
      type: 'FeatureCollection',
      features: data.map((item) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [item.properties.longitude, item.properties.latitude],
        },
        properties: item.properties,
      })),
    };

    return {
      id: 'point',
      label: '포인트 레이어',
      layer: (visible: boolean) =>
        new VectorLayer({
          source: new VectorSource({
            features: new GeoJSON().readFeatures(geoJsonData, {
              dataProjection: 'EPSG:4326',
              featureProjection: 'EPSG:3857',
            }),
          }),
          style: new Style({
            image: new CircleStyle({
              radius: 8,
              fill: new Fill({
                color: '#ff0000',
              }),
              stroke: new Stroke({
                color: '#ffffff',
                width: 2,
              }),
            }),
          }),
          visible,
          zIndex: 2,
          properties: {
            id: 'point',
            type: 'toggle',
          },
        }),
    };
  }

  static createLightLayer(): LayerInfo {
    return {
      id: 'light',
      label: '라이트 레이어',
      layer: (visible: boolean) =>
        new TileLayer({
          source: getRasterSource('light'),
          visible,
          opacity: 0.7,
          properties: {
            id: 'light',
            type: 'toggle',
          },
        }),
    };
  }

  static createBookmarkLayer(data: GetBookmarksResponse): LayerInfo {
    return {
      id: 'bookmark',
      label: '북마크 레이어',
      layer: (visible: boolean) =>
        new VectorLayer({
          source: new VectorSource({
            features: new GeoJSON().readFeatures(data, {
              dataProjection: 'EPSG:4326',
              featureProjection: 'EPSG:3857',
            }),
          }),
          style: new Style({
            image: new CircleStyle({
              radius: 8,
              fill: new Fill({
                color: '#ae00ff',
              }),
              stroke: new Stroke({
                color: '#ffffff',
                width: 2,
              }),
            }),
          }),
          visible,
          opacity: 0.7,
          zIndex: 1,
          properties: {
            id: 'bookmark',
            type: 'bookmark',
          },
        }),
    };
  }
}
