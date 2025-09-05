import { BOOKMARK_CONFIG } from '../constants/bookmark';
import type { BookmarkError, BookmarkErrorCode, ErrorMessageMapping } from '../types/bookmark';

/**
 * 에러 코드를 HTTP 상태 코드 또는 에러 유형에서 매핑
 */
export const mapErrorToCode = (error: unknown): BookmarkErrorCode => {
  if (!error) return 'UNKNOWN_ERROR';

  // Axios 에러 처리
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const axiosError = error as { response?: { status?: number } };
    const status = axiosError.response?.status;

    switch (status) {
      case 400:
        return 'VALIDATION_ERROR';
      case 401:
        return 'UNAUTHORIZED';
      case 403:
        return 'FORBIDDEN';
      case 404:
        return 'NOT_FOUND';
      case 409:
        return 'CONFLICT';
      case 429:
        return 'RATE_LIMITED';
      case 500:
      case 502:
      case 503:
      case 504:
        return 'SERVER_ERROR';
      case 408:
        return 'TIMEOUT';
      default:
        return 'SERVER_ERROR';
    }
  }

  // BookmarkError 타입 처리
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const bookmarkError = error as BookmarkError;
    if (bookmarkError.code) {
      return bookmarkError.code as BookmarkErrorCode;
    }
  }

  // 네트워크 에러 처리
  if (error instanceof Error) {
    if (error.message.includes('Network') || error.message.includes('network')) {
      return 'NETWORK_ERROR';
    }
    if (error.message.includes('timeout') || error.message.includes('Timeout')) {
      return 'TIMEOUT';
    }
  }

  return 'UNKNOWN_ERROR';
};

/**
 * 사용자 친화적 에러 메시지 생성
 */
export const getUserFriendlyErrorMessage = (
  error: unknown,
  context?: { operation?: string; retryCount?: number }
): ErrorMessageMapping[string] => {
  const errorCode = mapErrorToCode(error);
  const baseMessage = BOOKMARK_CONFIG.USER_FRIENDLY_ERROR_MESSAGES[errorCode] || 
    BOOKMARK_CONFIG.USER_FRIENDLY_ERROR_MESSAGES.UNKNOWN_ERROR;

  // 컨텍스트에 따른 메시지 커스터마이징
  if (context?.operation) {
    switch (context.operation) {
      case '북마크 목록 조회':
        if (errorCode === 'NETWORK_ERROR') {
          return {
            ...baseMessage,
            description: '북마크 목록을 불러올 수 없습니다. 인터넷 연결을 확인해주세요.',
          };
        }
        break;
      case '북마크 생성':
        if (errorCode === 'CONFLICT') {
          return {
            ...baseMessage,
            description: '동일한 이름의 북마크가 이미 존재합니다. 다른 이름을 사용해주세요.',
          };
        }
        break;
    }
  }

  // 재시도 횟수에 따른 메시지 조정
  if (context?.retryCount && context.retryCount > 2) {
    return {
      ...baseMessage,
      description: `${baseMessage.description} (${context.retryCount}번 시도함)`,
      severity: 'high' as const,
    };
  }

  return baseMessage;
};

/**
 * BookmarkError 객체 생성 헬퍼
 */
export const createBookmarkError = (
  message: string,
  code?: BookmarkErrorCode,
  originalError?: unknown,
  context?: {
    operation?: string;
    retryCount?: number;
    userFriendly?: boolean;
  }
): BookmarkError => {
  const error = new Error(message) as BookmarkError;
  error.name = 'BookmarkError';
  error.code = code || mapErrorToCode(originalError);
  error.details = originalError;
  error.context = {
    ...context,
    timestamp: new Date(),
    userFriendly: context?.userFriendly ?? true,
  };
  
  return error;
};

/**
 * 에러 로깅 헬퍼 (개발 환경에서만)
 */
export const logBookmarkError = (error: BookmarkError, context?: string) => {
  if (import.meta.env.DEV) {
    console.group(`🚨 BookmarkError${context ? `: ${context}` : ''}`);
    console.error('Error:', error.message);
    console.error('Code:', error.code);
    console.error('Context:', error.context);
    console.error('Original Error:', error.details);
    console.error('Stack:', error.stack);
    console.groupEnd();
  }
};

/**
 * 에러 복구 전략 제안
 */
export const getErrorRecoveryStrategy = (error: BookmarkError): {
  canRetry: boolean;
  retryDelay?: number;
  maxRetries?: number;
  userAction?: string;
} => {
  const errorCode = error.code || 'UNKNOWN_ERROR';

  switch (errorCode) {
    case 'NETWORK_ERROR':
    case 'TIMEOUT':
    case 'SERVER_ERROR':
      return {
        canRetry: true,
        retryDelay: 2000,
        maxRetries: 3,
        userAction: '네트워크 연결 확인 또는 잠시 후 재시도',
      };

    case 'RATE_LIMITED':
      return {
        canRetry: true,
        retryDelay: 10000,
        maxRetries: 2,
        userAction: '잠시 후 다시 시도',
      };

    case 'UNAUTHORIZED':
      return {
        canRetry: false,
        userAction: '다시 로그인 필요',
      };

    case 'FORBIDDEN':
      return {
        canRetry: false,
        userAction: '권한 확인 또는 관리자 문의',
      };

    case 'VALIDATION_ERROR':
    case 'CONFLICT':
      return {
        canRetry: false,
        userAction: '입력 데이터 수정 필요',
      };

    case 'NOT_FOUND':
      return {
        canRetry: true,
        retryDelay: 1000,
        maxRetries: 1,
        userAction: '페이지 새로고침',
      };

    default:
      return {
        canRetry: true,
        retryDelay: 3000,
        maxRetries: 2,
        userAction: '문제가 지속되면 관리자 문의',
      };
  }
};