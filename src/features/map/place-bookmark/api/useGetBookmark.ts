import { useQuery } from '@tanstack/react-query';
import { getBookmarks } from '@/entities/map/api/bookmark';
import { BOOKMARK_CONFIG } from '../constants/bookmark';
import type { BookmarkGeoJson, BookmarkError } from '../types/bookmark';
import { getUserFriendlyErrorMessage, logBookmarkError } from '../utils/errorHandler';

interface UseGetBookmarkReturn {
  // 데이터
  data: BookmarkGeoJson | undefined;
  bookmarkList: BookmarkGeoJson['features'] | undefined;
  
  // 상태
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  
  // 에러
  error: BookmarkError | null;
  userFriendlyError: string | null;
  
  // 유틸리티
  refetch: () => void;
  isStale: boolean;
}

/**
 * 북마크 목록을 조회하는 훅
 * 
 * @returns 북마크 데이터와 관련 상태들
 */
export const useGetBookmark = (): UseGetBookmarkReturn => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
    refetch,
    isStale,
  } = useQuery({
    queryKey: [BOOKMARK_CONFIG.API.QUERY_KEYS.BOOKMARKS],
    queryFn: getBookmarks,
    
    // 캐싱 및 리페칭 설정
    staleTime: 5 * 60 * 1000, // 5분간 데이터를 신선하게 유지
    gcTime: 10 * 60 * 1000,   // 10분간 캐시 유지 (구 cacheTime)
    
    // 리페칭 설정
    refetchOnWindowFocus: true,  // 윈도우 포커스 시 리페치
    refetchOnReconnect: true,    // 네트워크 재연결 시 리페치
    refetchOnMount: true,        // 마운트 시 리페치
    
    // 재시도 설정 (API 레이어에서 이미 재시도하므로 비활성화)
    retry: false,
    
    // 에러 처리
    throwOnError: false, // 에러를 throw하지 않고 error 상태로 관리
    
    // 성능 최적화
    networkMode: 'online', // 온라인일 때만 쿼리 실행
  });

  // 에러를 BookmarkError 타입으로 변환 및 사용자 친화적 메시지 생성
  const bookmarkError = error ? (error as BookmarkError) : null;
  const userFriendlyError = bookmarkError 
    ? getUserFriendlyErrorMessage(bookmarkError, { operation: '북마크 목록 조회' }).description 
    : null;

  // 에러 로깅 (개발 환경에서만)
  if (bookmarkError && import.meta.env.DEV) {
    logBookmarkError(bookmarkError, '북마크 목록 조회');
  }

  // 북마크 리스트 추출 및 유효성 검사
  const bookmarkList = data?.features?.filter(Boolean) || [];

  return {
    // 데이터
    data,
    bookmarkList,
    
    // 상태
    isLoading,
    isFetching,
    isError,
    isSuccess,
    
    // 에러
    error: bookmarkError,
    userFriendlyError,
    
    // 유틸리티
    refetch: () => {
      refetch();
    },
    isStale,
  };
};
