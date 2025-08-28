import type Layer from 'ol/layer/Layer';

export type FeatureType = 'Point' | 'Polygon';

export type LayerInfo = {
  id: string;
  label: string;
  layer: (visible: boolean) => Layer;
};

export type GeoJson<T, U> = {
  type: string;
  features: Feature<T, U>[];
};

export type Feature<T, U> = {
  type: string;
  geometry: T;
  properties: U;
};

export type Polygon = {
  type: FeatureType;
  coordinates: number[][][];
};

export type PolygonInfo = {
  name: string;
  description: string;
  category: string;
  area: number;
  center: number[];
};
