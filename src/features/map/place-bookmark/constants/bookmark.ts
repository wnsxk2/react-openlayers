/**
 * 북마크 기능 관련 상수 정의
 */

export const BOOKMARK_CONFIG = {
  // 레이어 설정
  LAYER: {
    ID: 'bookmark',
    LABEL: '북마크 레이어',
    TYPE: 'bookmark',
    Z_INDEX: 1,
    OPACITY: 0.7,
  },
  
  // 스타일 설정
  STYLE: {
    FILL_COLOR: '#ae00ff',
    STROKE_COLOR: '#ffffff',
    STROKE_WIDTH: 2,
    RADIUS: 8,
  },
  
  // UI 설정
  UI: {
    TITLE: '북마크',
    ADD_BUTTON_TEXT: '+',
    MODAL_TITLE: '북마크 추가',
    MODAL_CONFIRM_TEXT: '추가',
    MODAL_CANCEL_TEXT: '취소',
    MODAL_QUESTION: '이 위치를 북마크에 추가하시겠습니까?',
    BOOKMARK_NAME_LABEL: '북마크 명 : ',
  },
  
  // API 관련 설정
  API: {
    ENDPOINTS: {
      GET_BOOKMARKS: '/api/v1/map/bookmarks',
      POST_BOOKMARK: '/api/v1/map/bookmark',
    },
    QUERY_KEYS: {
      BOOKMARKS: 'bookmarks',
      POST_BOOKMARK: 'post-bookmark',
    },
  },
  
  // 좌표 변환 설정
  PROJECTION: {
    SOURCE: 'EPSG:3857', // Web Mercator
    TARGET: 'EPSG:4326', // WGS84
  },
  
  // 에러 메시지
  ERROR_MESSAGES: {
    API_REQUEST_FAILED: 'API 요청 처리 중 에러가 발생했습니다.',
    BOOKMARK_CREATION_FAILED: '북마크 생성에 실패했습니다.',
    BOOKMARK_FETCH_FAILED: '북마크 목록을 불러오는데 실패했습니다.',
    COORDINATE_TRANSFORM_FAILED: '좌표 변환에 실패했습니다.',
    INVALID_COORDINATE: '유효하지 않은 좌표입니다.',
    EMPTY_BOOKMARK_NAME: '북마크 이름을 입력해주세요.',
  },
  
  // 사용자 친화적 에러 메시지 매핑
  USER_FRIENDLY_ERROR_MESSAGES: {
    NETWORK_ERROR: {
      title: '네트워크 연결 오류',
      description: '인터넷 연결을 확인하고 다시 시도해주세요.',
      action: '다시 시도',
      severity: 'medium' as const,
    },
    VALIDATION_ERROR: {
      title: '입력값 오류',
      description: '입력하신 정보를 다시 확인해주세요.',
      action: '수정',
      severity: 'low' as const,
    },
    SERVER_ERROR: {
      title: '서버 오류',
      description: '서버에서 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
      action: '다시 시도',
      severity: 'high' as const,
    },
    NOT_FOUND: {
      title: '데이터를 찾을 수 없음',
      description: '요청한 북마크 정보를 찾을 수 없습니다.',
      action: '새로고침',
      severity: 'medium' as const,
    },
    UNAUTHORIZED: {
      title: '인증 오류',
      description: '로그인이 필요합니다. 다시 로그인해주세요.',
      action: '로그인',
      severity: 'high' as const,
    },
    FORBIDDEN: {
      title: '권한 오류',
      description: '이 작업을 수행할 권한이 없습니다.',
      action: '관리자 문의',
      severity: 'high' as const,
    },
    CONFLICT: {
      title: '데이터 충돌',
      description: '동일한 이름의 북마크가 이미 존재합니다.',
      action: '이름 변경',
      severity: 'medium' as const,
    },
    RATE_LIMITED: {
      title: '요청 한도 초과',
      description: '잠시 후 다시 시도해주세요.',
      action: '잠시 후 시도',
      severity: 'medium' as const,
    },
    TIMEOUT: {
      title: '요청 시간 초과',
      description: '요청 처리 시간이 초과되었습니다. 다시 시도해주세요.',
      action: '다시 시도',
      severity: 'medium' as const,
    },
    UNKNOWN_ERROR: {
      title: '알 수 없는 오류',
      description: '예상치 못한 오류가 발생했습니다. 문제가 지속되면 관리자에게 문의해주세요.',
      action: '관리자 문의',
      severity: 'high' as const,
    },
  },
  
  // 로딩 메시지
  LOADING_MESSAGES: {
    FETCHING_BOOKMARKS: '북마크를 불러오는 중...',
    CREATING_BOOKMARK: '북마크를 생성하는 중...',
  },
  
  // 성공 메시지
  SUCCESS_MESSAGES: {
    BOOKMARK_CREATED: '북마크가 성공적으로 생성되었습니다.',
    BOOKMARK_DELETED: '북마크가 성공적으로 삭제되었습니다.',
  },
} as const;

// 북마크 모드 타입
export const BOOKMARK_MODE = {
  NORMAL: 'normal',
  BOOKMARK: 'bookmark',
} as const;

export type BookmarkModeType = typeof BOOKMARK_MODE[keyof typeof BOOKMARK_MODE];