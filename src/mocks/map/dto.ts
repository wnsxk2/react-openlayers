import type { GeoJson, PointInfo } from '@/mocks/map/type';
import type { ResponseDTO } from '@/mocks/user/type';
import { HttpResponse } from 'msw';

/**
 * point 요청 데이터 dto
 */
type PointListResponse = GeoJson<PointInfo>[];

export function createPointListResponse(data: GeoJson<PointInfo>[]): Response {
  const response: ResponseDTO<PointListResponse> = {
    success: true,
    data: data,
  };
  return HttpResponse.json(response);
}
