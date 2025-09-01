import type { Geometry, PointInfo } from '@/entities/map';
import type { ApiResponse } from '@/shared/types';
import axios from 'axios';

export type GetPointResponse = Geometry<PointInfo>[];;

async function getPoint(): Promise<GetPointResponse> {
  const response = await axios.get<ApiResponse<GetPointResponse>>(
    '/api/v1/map/point'
  );    

  if (!response.data.success) {
    throw new Error(
      response.data.error?.message || 'API 요청 처리 중 에러가 발생했습니다.'
    );
  }

  return response.data.data!;
}

export { getPoint };
