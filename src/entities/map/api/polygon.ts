import type { GeoJson, Polygon, PolygonInfo } from '@/entities/map';
import type { ApiResponse } from '@/shared/types';
import axios from 'axios';

type GetPolygonResponse = GeoJson<Polygon, PolygonInfo>;

async function getPolygon(): Promise<GetPolygonResponse> {
  const response = await axios.get<ApiResponse<GetPolygonResponse>>(
    '/api/v1/map/polygon'
  );

  if (!response.data.success) {
    new Error(
      response.data.error?.message || 'API 요청 처리 중 에러가 발생했습니다.'
    );
  }

  return response.data.data!;
}

export { getPolygon };
