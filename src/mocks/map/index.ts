import { points } from '@/mocks/map/constant';
import { createPointListResponse } from '@/mocks/map/dto';
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
];
