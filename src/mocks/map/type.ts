export type GeoJson<T> = {
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
