import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postBookmark, type PostBookmarkRequest } from '@/entities/map/api/bookmark';
import { BOOKMARK_CONFIG } from '../constants/bookmark';
import type { BookmarkGeoJson, BookmarkError, BookmarkInfo } from '../types/bookmark';
import { getUserFriendlyErrorMessage, logBookmarkError } from '../utils/errorHandler';

interface UsePostBookmarkOptions {
  onSuccess?: (data: null, variables: PostBookmarkRequest) => void;
  onError?: (error: BookmarkError, variables: PostBookmarkRequest) => void;
  enableOptimistic?: boolean;
}

interface UsePostBookmarkReturn {
  mutate: (variables: PostBookmarkRequest) => void;
  mutateAsync: (variables: PostBookmarkRequest) => Promise<null>;
  isLoading: boolean;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: BookmarkError | null;
  userFriendlyError: string | null;
  reset: () => void;
}

/**
 * 북마크 생성을 위한 뮤테이션 훅
 * 
 * @param options - 훅 설정 옵션
 * @returns 뮤테이션 관련 함수들과 상태
 */
export const usePostBookmark = (options: UsePostBookmarkOptions = {}): UsePostBookmarkReturn => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, enableOptimistic = true } = options;

  /**
   * 옵티미스틱 업데이트를 위한 임시 북마크 생성
   */
  const createOptimisticBookmark = (request: PostBookmarkRequest): BookmarkInfo => ({
    name: request.name,
    center: request.coord,
  });

  const mutation = useMutation({
    mutationFn: postBookmark,
    mutationKey: [BOOKMARK_CONFIG.API.QUERY_KEYS.POST_BOOKMARK],

    // 옵티미스틱 업데이트
    onMutate: async (variables: PostBookmarkRequest) => {
      if (!enableOptimistic) return;

      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ 
        queryKey: [BOOKMARK_CONFIG.API.QUERY_KEYS.BOOKMARKS] 
      });

      // 현재 데이터 백업
      const previousBookmarks = queryClient.getQueryData<BookmarkGeoJson>([
        BOOKMARK_CONFIG.API.QUERY_KEYS.BOOKMARKS
      ]);

      // 옵티미스틱 업데이트 적용
      if (previousBookmarks) {
        const optimisticBookmark = createOptimisticBookmark(variables);
        const newFeature = {
          type: 'Feature' as const,
          geometry: {
            type: 'Point' as const,
            coordinates: variables.coord,
          },
          properties: optimisticBookmark,
        };

        const updatedBookmarks: BookmarkGeoJson = {
          ...previousBookmarks,
          features: [...previousBookmarks.features, newFeature],
        };

        queryClient.setQueryData(
          [BOOKMARK_CONFIG.API.QUERY_KEYS.BOOKMARKS], 
          updatedBookmarks
        );
      }

      return { previousBookmarks };
    },

    // 성공 시 처리
    onSuccess: (data, variables) => {
      // 북마크 목록 새로고침
      queryClient.invalidateQueries({ 
        queryKey: [BOOKMARK_CONFIG.API.QUERY_KEYS.BOOKMARKS] 
      });

      // 사용자 정의 성공 콜백 실행
      if (onSuccess) {
        onSuccess(data, variables);
      }
    },

    // 에러 시 처리
    onError: (error, variables, context) => {
      // 옵티미스틱 업데이트 롤백
      if (enableOptimistic && context?.previousBookmarks) {
        queryClient.setQueryData(
          [BOOKMARK_CONFIG.API.QUERY_KEYS.BOOKMARKS],
          context.previousBookmarks
        );
      }

      // 에러를 BookmarkError 타입으로 변환
      const bookmarkError = error as BookmarkError;

      // 에러 로깅 (개발 환경에서만)
      if (import.meta.env.DEV) {
        logBookmarkError(bookmarkError, '북마크 생성');
      }

      // 사용자 정의 에러 콜백 실행
      if (onError) {
        onError(bookmarkError, variables);
      }
    },

    // 완료 시 처리 (성공/실패 관계없이)
    onSettled: () => {
      // 북마크 목록을 다시 가져와서 최신 상태로 동기화
      queryClient.invalidateQueries({ 
        queryKey: [BOOKMARK_CONFIG.API.QUERY_KEYS.BOOKMARKS] 
      });
    },

    // 재시도 설정 (API 레이어에서 이미 처리하므로 비활성화)
    retry: false,

    // 네트워크 모드
    networkMode: 'online',

    // 에러 던지기 비활성화
    throwOnError: false,
  });

  // 사용자 친화적 에러 메시지 생성
  const bookmarkError = mutation.error as BookmarkError | null;
  const userFriendlyError = bookmarkError 
    ? getUserFriendlyErrorMessage(bookmarkError, { operation: '북마크 생성' }).description 
    : null;

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending, // TanStack Query v5에서 isPending 사용
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: bookmarkError,
    userFriendlyError,
    reset: mutation.reset,
  };
};
