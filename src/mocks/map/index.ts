import { points, polygonList } from '@/mocks/map/constant';
import {
  createPointListResponse,
  createPolygonListResponse,
} from '@/mocks/map/dto';
import type { FeatureType } from '@/mocks/map/type';
import { createErrorResponse } from '@/mocks/shared/dto';
import { http } from 'msw';

export const mapHandlers = [
  http.get('/api/v1/map/point', async () => {
    try {
      return createPointListResponse(points);
    } catch (error) {
      console.error(error);
      return createErrorResponse('서버 내부 오류가 발생했습니다.', 500);
    }
  }),

  http.get('/api/v1/map/polygon', async () => {
    try {
      const parsePolygonList = polygonList.map(
        ({ name, description, category, area, center, location }) => ({
          type: 'Feature',
          geometry: {
            type: location.type as FeatureType,
            coordinates: location.coordinates,
          },
          properties: {
            name,
            description,
            category,
            area,
            center,
          },
        })
      );
      return createPolygonListResponse(parsePolygonList);
    } catch (error) {
      console.error(error);
      return createErrorResponse('서버 내부 오류가 발생했습니다.', 500);
    }
  }),
];
