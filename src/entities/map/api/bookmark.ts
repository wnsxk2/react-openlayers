import type { GeoJson, Point, PolygonInfo } from '@/entities/map/model/types';
import type { ApiResponse } from '@/shared/types';
import axios, { isAxiosError } from 'axios';

export type GetBookmarksResponse = GeoJson<Point, BookmarkInfo>;
type BookmarkInfo = Omit<PolygonInfo, 'description' | 'area' | 'category'>;

async function getBookmarks(): Promise<GetBookmarksResponse> {
  try {
    const response = await axios.get<ApiResponse<GetBookmarksResponse>>(
      '/api/v1/map/bookmarks'
    );

    if (!response.data.success) {
      throw new Error(
        response.data.error?.message || 'API 요청 처리 중 에러가 발생했습니다.'
      );
    }

    return response.data.data!;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data.error.message ||
          'API 요청 처리 중 에러가 발생했습니다.'
      );
    } else {
      throw error;
    }
  }
}

export type PostBookmarkRequest = {
  name: string;
  coord: number[];
};

async function postBookmark(body: PostBookmarkRequest): Promise<null> {
  try {
    const response = await axios.post<ApiResponse<null>>(
      '/api/v1/map/bookmark',
      body
    );

    if (!response.data.success) {
      throw new Error(
        response.data.error?.message || 'API 요청 처리 중 에러가 발생했습니다.'
      );
    }

    return response.data.data!;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data.error.message ||
          'API 요청 처리 중 에러가 발생했습니다.'
      );
    } else {
      throw error;
    }
  }
}

export { getBookmarks, postBookmark };
