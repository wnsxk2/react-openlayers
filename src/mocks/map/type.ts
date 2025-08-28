export type Geometry<T> = {
  geom: string;
  properties: T;
};

export type PointInfo = {
  locationName: string;
  type: '포인트';
  region: string;
  importance: Importance;
  latitude: number;
  longitude: number;
};

export type Importance = '높음' | '보통' | '낮음';

export type GeoJson<T, U> = {
  type: string;
  features: Feature<T, U>[];
};

export type Feature<T, U> = {
  type: string;
  geometry: T;
  properties: U;
};

export type Point = {
  type: FeatureType;
  coordinates: number[];
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

export type FeatureType = 'Point' | 'Polygon';
