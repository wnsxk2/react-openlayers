import type { GeoJson, PointInfo } from '@/mocks/map/type';

export const points: GeoJson<PointInfo>[] = [
  {
    geom: 'POINT(14368827.101334965 4172067.81586528)',
    properties: {
      locationName: '홍대입구역',
      type: '포인트',
      region: '서울',
      importance: '보통',
      latitude: 37.5563,
      longitude: 126.927,
    },
  },
  {
    geom: 'POINT(14370157.892734138 4174107.573058949)',
    properties: {
      locationName: '서울시청',
      type: '포인트',
      region: '서울',
      importance: '높음',
      latitude: 37.5663,
      longitude: 126.9779,
    },
  },
  {
    geom: 'POINT(14375676.520275444 4164761.4906464443)',
    properties: {
      locationName: '강남역',
      type: '포인트',
      region: '서울',
      importance: '높음',
      latitude: 37.4979,
      longitude: 127.0276,
    },
  },
  {
    geom: 'POINT(14376914.793583682 4165419.754736722)',
    properties: {
      locationName: '삼성역',
      type: '포인트',
      region: '서울',
      importance: '낮음',
      latitude: 37.5044,
      longitude: 127.0473,
    },
  },
  {
    geom: 'POINT(14362700.348267937 4161701.685926316)',
    properties: {
      locationName: '김포공항',
      type: '포인트',
      region: '경기',
      importance: '보통',
      latitude: 37.4844,
      longitude: 126.8895,
    },
  },
  {
    geom: 'POINT(14382625.924015708 4167280.236806639)',
    properties: {
      locationName: '잠실역',
      type: '포인트',
      region: '서울',
      importance: '높음',
      latitude: 37.5133,
      longitude: 127.1058,
    },
  },
];
