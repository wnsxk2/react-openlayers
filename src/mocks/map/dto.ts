import type {
  Feature,
  GeoJson,
  Geometry,
  PointInfo,
  Polygon,
  PolygonInfo,
} from '@/mocks/map/type';
import type { ResponseDTO } from '@/mocks/shared/type';

import { HttpResponse } from 'msw';

/**
 * point 요청 데이터 dto
 */
type PointListResponse = Geometry<PointInfo>[];

export function createPointListResponse(data: Geometry<PointInfo>[]): Response {
  const response: ResponseDTO<PointListResponse> = {
    success: true,
    data: data,
  };
  return HttpResponse.json(response);
}

/**
 * polygon 요청 데이터 dto
 */

type PolygonListResponse = GeoJson<Polygon, PolygonInfo>;

export function createPolygonListResponse(
  data: Feature<Polygon, PolygonInfo>[]
): Response {
  const response: ResponseDTO<PolygonListResponse> = {
    success: true,
    data: {
      type: 'FeatureCollection',
      features: data,
    },
  };
  return HttpResponse.json(response);
}
