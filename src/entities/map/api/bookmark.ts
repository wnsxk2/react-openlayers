import type { GeoJson, Point, PolygonInfo } from '@/entities/map/model/types';
import type { ApiResponse } from '@/shared/types';
import axios, { isAxiosError, type AxiosError } from 'axios';
import { BOOKMARK_CONFIG } from '@/features/map/place-bookmark/constants/bookmark';
import type { BookmarkError } from '@/features/map/place-bookmark/types/bookmark';
import { 
  createBookmarkError, 
  mapErrorToCode, 
  getUserFriendlyErrorMessage,
  logBookmarkError
} from '@/features/map/place-bookmark/utils/errorHandler';

export type GetBookmarksResponse = GeoJson<Point, BookmarkInfo>;
type BookmarkInfo = Omit<PolygonInfo, 'description' | 'area' | 'category'>;

/**
 * 재시도 가능한 HTTP 상태 코드
 */
const RETRYABLE_STATUS_CODES = [408, 429, 500, 502, 503, 504];

/**
 * 재시도 설정
 */
const RETRY_CONFIG = {
  maxRetries: 3,
  baseDelay: 1000, // 1초
  maxDelay: 5000,  // 5초
};

/**
 * 지수 백오프를 사용한 재시도 지연 계산
 */
const calculateRetryDelay = (attempt: number): number => {
  const delay = Math.min(
    RETRY_CONFIG.baseDelay * Math.pow(2, attempt),
    RETRY_CONFIG.maxDelay
  );
  // 지터 추가 (랜덤한 추가 지연)
  return delay + Math.random() * 1000;
};

/**
 * 재시도 가능한 에러인지 확인
 */
const isRetryableError = (error: unknown): boolean => {
  if (!isAxiosError(error)) return false;
  
  const status = error.response?.status;
  if (!status) return true; // 네트워크 에러 등은 재시도 가능
  
  return RETRYABLE_STATUS_CODES.includes(status);
};

/**
 * 향상된 BookmarkError 객체 생성 (errorHandler 유틸리티 사용)
 */
const createEnhancedBookmarkError = (
  message: string,
  originalError?: unknown,
  operation?: string
): BookmarkError => {
  const errorCode = mapErrorToCode(originalError);
  const userFriendlyMessage = getUserFriendlyErrorMessage(originalError, { operation });
  
  const error = createBookmarkError(
    message,
    errorCode,
    originalError,
    {
      operation,
      userFriendly: true,
    }
  );

  // 사용자 친화적 메시지를 error 객체에 추가
  (error as BookmarkError & { userFriendlyMessage?: unknown }).userFriendlyMessage = userFriendlyMessage;

  // 개발 환경에서 로깅
  logBookmarkError(error, operation);

  return error;
};

/**
 * Axios 에러에서 사용자 친화적 메시지 추출
 */
const extractErrorMessage = (error: AxiosError): string => {
  const status = error.response?.status;
  const serverMessage = error.response?.data?.error?.message;
  
  switch (status) {
    case 400:
      return serverMessage || '잘못된 요청입니다. 입력 데이터를 확인해주세요.';
    case 401:
      return '인증이 필요합니다. 다시 로그인해주세요.';
    case 403:
      return '접근 권한이 없습니다.';
    case 404:
      return '요청한 리소스를 찾을 수 없습니다.';
    case 409:
      return serverMessage || '이미 존재하는 북마크입니다.';
    case 429:
      return '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.';
    case 500:
      return '서버 내부 오류가 발생했습니다.';
    case 502:
    case 503:
    case 504:
      return '서버가 일시적으로 사용할 수 없습니다. 잠시 후 다시 시도해주세요.';
    default:
      return serverMessage || BOOKMARK_CONFIG.ERROR_MESSAGES.API_REQUEST_FAILED;
  }
};

/**
 * 재시도 로직이 포함된 API 호출 래퍼
 */
const withRetry = async <T>(
  fn: () => Promise<T>,
  context: string
): Promise<T> => {
  let lastError: unknown;
  
  for (let attempt = 0; attempt <= RETRY_CONFIG.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // 마지막 시도이거나 재시도 불가능한 에러인 경우
      if (attempt === RETRY_CONFIG.maxRetries || !isRetryableError(error)) {
        break;
      }
      
      // 재시도 전 지연
      const delay = calculateRetryDelay(attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  // 모든 재시도 실패 시 에러 처리
  if (isAxiosError(lastError)) {
    const message = extractErrorMessage(lastError);
    throw createEnhancedBookmarkError(message, lastError, context);
  } else if (lastError instanceof Error) {
    throw createEnhancedBookmarkError(
      `${context} 중 오류가 발생했습니다: ${lastError.message}`,
      lastError,
      context
    );
  } else {
    throw createEnhancedBookmarkError(
      `${context} 중 알 수 없는 오류가 발생했습니다.`,
      lastError,
      context
    );
  }
};

async function getBookmarks(): Promise<GetBookmarksResponse> {
  return withRetry(async () => {
    const response = await axios.get<ApiResponse<GetBookmarksResponse>>(
      BOOKMARK_CONFIG.API.ENDPOINTS.GET_BOOKMARKS
    );

    if (!response.data.success) {
      throw createEnhancedBookmarkError(
        response.data.error?.message || BOOKMARK_CONFIG.ERROR_MESSAGES.BOOKMARK_FETCH_FAILED,
        response.data.error,
        '북마크 목록 조회'
      );
    }

    // 데이터 검증
    if (!response.data.data) {
      throw createEnhancedBookmarkError(
        '북마크 데이터를 받지 못했습니다.',
        response.data,
        '북마크 목록 조회'
      );
    }

    return response.data.data;
  }, '북마크 목록 조회');
}

export type PostBookmarkRequest = {
  name: string;
  coord: number[];
};

/**
 * PostBookmarkRequest 데이터 검증
 */
const validatePostBookmarkRequest = (data: PostBookmarkRequest): void => {
  if (!data.name || data.name.trim().length === 0) {
    throw createEnhancedBookmarkError(
      BOOKMARK_CONFIG.ERROR_MESSAGES.EMPTY_BOOKMARK_NAME,
      data,
      '북마크 생성'
    );
  }

  if (data.name.trim().length > 100) {
    throw createEnhancedBookmarkError(
      '북마크 이름이 너무 깁니다. (최대 100자)',
      data,
      '북마크 생성'
    );
  }

  if (!Array.isArray(data.coord) || data.coord.length !== 2) {
    throw createEnhancedBookmarkError(
      BOOKMARK_CONFIG.ERROR_MESSAGES.INVALID_COORDINATE,
      data,
      '북마크 생성'
    );
  }

  const [lon, lat] = data.coord;
  if (typeof lon !== 'number' || typeof lat !== 'number') {
    throw createEnhancedBookmarkError(
      BOOKMARK_CONFIG.ERROR_MESSAGES.INVALID_COORDINATE,
      data,
      '북마크 생성'
    );
  }

  // WGS84 범위 검증
  if (lon < -180 || lon > 180 || lat < -90 || lat > 90) {
    throw createEnhancedBookmarkError(
      '유효하지 않은 좌표 범위입니다. (경도: -180~180, 위도: -90~90)',
      data,
      '북마크 생성'
    );
  }
};

async function postBookmark(body: PostBookmarkRequest): Promise<null> {
  // 입력 데이터 검증
  validatePostBookmarkRequest(body);

  return withRetry(async () => {
    const response = await axios.post<ApiResponse<null>>(
      BOOKMARK_CONFIG.API.ENDPOINTS.POST_BOOKMARK,
      {
        ...body,
        name: body.name.trim(), // 앞뒤 공백 제거
      }
    );

    if (!response.data.success) {
      throw createEnhancedBookmarkError(
        response.data.error?.message || BOOKMARK_CONFIG.ERROR_MESSAGES.BOOKMARK_CREATION_FAILED,
        response.data.error,
        '북마크 생성'
      );
    }

    return response.data.data;
  }, '북마크 생성');
}

export { getBookmarks, postBookmark };
