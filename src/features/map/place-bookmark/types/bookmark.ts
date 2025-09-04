import type { Coordinate } from 'ol/coordinate';
import type { Map } from 'ol';
import type { GeoJson, Point, LayerInfo } from '@/entities/map/model/types';
import type { BOOKMARK_MODE } from '../constants/bookmark';

/**
 * 북마크 모드 타입
 */
export type BookmarkMode = (typeof BOOKMARK_MODE)[keyof typeof BOOKMARK_MODE];

/**
 * 북마크 정보 타입
 */
export interface BookmarkInfo {
  name: string;
  center: number[];
}

/**
 * 북마크 GeoJSON 응답 타입
 */
export type BookmarkGeoJson = GeoJson<Point, BookmarkInfo>;

/**
 * 북마크 생성 요청 타입
 */
export interface CreateBookmarkRequest {
  name: string;
  coord: number[];
}

/**
 * 북마크 상태 관리 타입
 */
export interface BookmarkState {
  mode: BookmarkMode;
  modalState: {
    isOpen: boolean;
    coordinate: Coordinate | null;
  };
  layerVisibility: Record<string, boolean>;
  isLoading: boolean;
  error: string | null;
}

/**
 * 북마크 패널 Props
 */
export interface BookmarkPanelProps {
  mapInstance: Map | null;
  isMapReady: boolean;
  defaultLayers?: LayerInfo[];
  bookmarkMode: boolean;
  onChangeMode: (value: boolean) => void;
}

/**
 * 북마크 모드 토글 Props
 */
export interface BookmarkModeToggleProps {
  isBookmarkMode: boolean;
  onToggle: () => void;
  isLoading?: boolean;
}

/**
 * 북마크 목록 Props
 */
export interface BookmarkListProps {
  bookmarks: BookmarkInfo[] | undefined;
  onBookmarkClick: (bookmark: BookmarkInfo) => void;
  isLoading?: boolean;
  error?: string | null;
}

/**
 * 북마크 아이템 Props
 */
export interface BookmarkItemProps {
  name: string;
  center: number[];
  onClick: () => void;
}

/**
 * 북마크 모달 Props
 */
export interface BookmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string) => void;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'warning' | 'error';
  size?: 'sm' | 'md';
}

/**
 * 북마크 모드 훅 반환 타입
 */
export interface UseBookmarkModeReturn {
  mode: BookmarkMode;
  isBookmarkMode: boolean;
  toggleMode: () => void;
  setNormalMode: () => void;
  setBookmarkMode: () => void;
  layerVisibility: Record<string, boolean>;
}

/**
 * 북마크 레이어 훅 Props
 */
export interface UseBookmarkLayerProps {
  mapInstance: Map | null;
  isMapReady: boolean;
  bookmarks: BookmarkGeoJson | undefined;
}

/**
 * 북마크 레이어 훅 반환 타입
 */
export interface UseBookmarkLayerReturn {
  isLayerVisible: boolean;
  toggleLayerVisibility: (visible: boolean) => void;
  refreshLayer: () => void;
}

/**
 * 지도 클릭 훅 Props
 */
export interface UseMapClickProps {
  mapInstance: Map | null;
  isMapReady: boolean;
  isEnabled: boolean;
  onMapClick: (coordinate: Coordinate) => void;
}

/**
 * 지도 클릭 훅 반환 타입
 */
export interface UseMapClickReturn {
  lastClickedCoordinate: Coordinate | null;
  clearLastClick: () => void;
}

/**
 * 좌표 변환 훅 반환 타입
 */
export interface UseCoordinateTransformReturn {
  transformToWGS84: (coordinate: Coordinate) => Coordinate;
  transformToWebMercator: (coordinate: Coordinate) => Coordinate;
  isValidCoordinate: (coordinate: Coordinate) => boolean;
  formatCoordinate: (coordinate: Coordinate, precision?: number) => string;
  calculateDistance: (coord1: Coordinate, coord2: Coordinate) => number;
}

/**
 * 북마크 에러 타입
 */
export interface BookmarkError extends Error {
  code?: string;
  details?: unknown;
  context?: {
    operation?: string;
    retryCount?: number;
    timestamp?: Date;
    userFriendly?: boolean;
  };
}

/**
 * 북마크 에러 코드 타입
 */
export type BookmarkErrorCode =
  | 'NETWORK_ERROR'
  | 'VALIDATION_ERROR'
  | 'SERVER_ERROR'
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'CONFLICT'
  | 'RATE_LIMITED'
  | 'TIMEOUT'
  | 'UNKNOWN_ERROR';

/**
 * 사용자 친화적 에러 메시지 매핑
 */
export interface ErrorMessageMapping {
  [key: string]: {
    title: string;
    description: string;
    action?: string;
    severity: 'low' | 'medium' | 'high';
  };
}

/**
 * 로딩 상태 Props
 */
export interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * 에러 메시지 Props
 */
export interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  variant?: 'error' | 'warning' | 'info';
}
