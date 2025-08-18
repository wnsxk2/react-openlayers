import type { Geometry, PointInfo } from '@/mocks/map/type';

export const points: Geometry<PointInfo>[] = [
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

export const polygonList = [
  {
    name: '종로구',
    description: '서울특별시의 중심부에 위치한 역사와 문화의 중심지입니다.',
    category: '행정구역',
    area: 23.91,
    center: [126.977969, 37.57295],
    location: {
      type: 'Polygon',
      coordinates: [
        [
          [127.0276, 37.4979],
          [127.06, 37.4979],
          [127.06, 37.52],
          [127.0276, 37.52],
          [127.0276, 37.4979],
        ],
      ],
    },
  },
  {
    name: '강남구',
    description: '대한민국의 경제, 비즈니스, 패션의 중심지 중 하나입니다.',
    category: '행정구역',
    area: 39.55,
    center: [127.047502, 37.517331],
    location: {
      type: 'Polygon',
      coordinates: [
        [
          [127.02, 37.49],
          [127.06, 37.49],
          [127.06, 37.52],
          [127.02, 37.52],
          [127.02, 37.49],
        ],
      ],
    },
  },
  {
    name: '마포구',
    description:
      '홍대 거리로 대표되는 젊음과 예술, 그리고 다양한 문화가 공존하는 지역입니다.',
    category: '행정구역',
    area: 23.85,
    center: [126.908421, 37.563914],
    location: {
      type: 'Polygon',
      coordinates: [
        [
          [126.89, 37.53],
          [126.95, 37.53],
          [126.95, 37.57],
          [126.89, 37.57],
          [126.89, 37.53],
        ],
      ],
    },
  },
  {
    name: '송파구',
    description:
      '서울의 남동쪽에 위치하며, 올림픽공원과 롯데월드타워로 유명합니다.',
    category: '행정구역',
    area: 33.87,
    center: [127.105862, 37.514544],
    location: {
      type: 'Polygon',
      coordinates: [
        [
          [127.08, 37.5],
          [127.12, 37.5],
          [127.12, 37.53],
          [127.08, 37.53],
          [127.08, 37.5],
        ],
      ],
    },
  },
  {
    name: '영등포구',
    description:
      '국회의사당이 위치한 정치의 중심지이며, 금융 및 상업 지구입니다.',
    category: '행정구역',
    area: 24.55,
    center: [126.908427, 37.526369],
    location: {
      type: 'Polygon',
      coordinates: [
        [
          [126.88, 37.51],
          [126.94, 37.51],
          [126.94, 37.54],
          [126.88, 37.54],
          [126.88, 37.51],
        ],
      ],
    },
  },
];
