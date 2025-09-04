import { useCallback } from 'react';
import { transform } from 'ol/proj';
import type { Coordinate } from 'ol/coordinate';
import { BOOKMARK_CONFIG } from '../constants/bookmark';
import type { UseCoordinateTransformReturn } from '../types/bookmark';

/**
 * 좌표 변환 유틸리티 훅
 * 
 * @returns 좌표 변환 함수들
 */
export const useCoordinateTransform = (): UseCoordinateTransformReturn => {
  
  /**
   * Web Mercator (EPSG:3857)에서 WGS84 (EPSG:4326)로 변환
   * 
   * @param coordinate - 변환할 좌표 [x, y]
   * @returns 변환된 좌표 [longitude, latitude]
   */
  const transformToWGS84 = useCallback((coordinate: Coordinate): Coordinate => {
    try {
      return transform(
        coordinate,
        BOOKMARK_CONFIG.PROJECTION.SOURCE, // EPSG:3857
        BOOKMARK_CONFIG.PROJECTION.TARGET  // EPSG:4326
      );
    } catch (error) {
      console.error('WGS84 변환 중 오류 발생:', error);
      throw new Error(BOOKMARK_CONFIG.ERROR_MESSAGES.COORDINATE_TRANSFORM_FAILED);
    }
  }, []);

  /**
   * WGS84 (EPSG:4326)에서 Web Mercator (EPSG:3857)로 변환
   * 
   * @param coordinate - 변환할 좌표 [longitude, latitude]
   * @returns 변환된 좌표 [x, y]
   */
  const transformToWebMercator = useCallback((coordinate: Coordinate): Coordinate => {
    try {
      return transform(
        coordinate,
        BOOKMARK_CONFIG.PROJECTION.TARGET, // EPSG:4326
        BOOKMARK_CONFIG.PROJECTION.SOURCE  // EPSG:3857
      );
    } catch (error) {
      console.error('Web Mercator 변환 중 오류 발생:', error);
      throw new Error(BOOKMARK_CONFIG.ERROR_MESSAGES.COORDINATE_TRANSFORM_FAILED);
    }
  }, []);

  /**
   * 좌표 유효성 검사
   * 
   * @param coordinate - 검사할 좌표
   * @returns 좌표가 유효한지 여부
   */
  const isValidCoordinate = useCallback((coordinate: Coordinate): boolean => {
    if (!coordinate || coordinate.length < 2) {
      return false;
    }

    const [x, y] = coordinate;

    // 숫자인지 확인
    if (typeof x !== 'number' || typeof y !== 'number') {
      return false;
    }

    // NaN, Infinity 확인
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      return false;
    }

    // WGS84 좌표계 범위 확인 (경도: -180~180, 위도: -90~90)
    // 입력이 Web Mercator일 수도 있으므로 더 넓은 범위로 체크
    const isReasonableRange = 
      x >= -20037508.34 && x <= 20037508.34 && // Web Mercator X 범위
      y >= -20048966.10 && y <= 20048966.10;   // Web Mercator Y 범위

    const isWGS84Range = 
      x >= -180 && x <= 180 &&  // WGS84 경도 범위
      y >= -90 && y <= 90;      // WGS84 위도 범위

    return isReasonableRange || isWGS84Range;
  }, []);

  /**
   * 좌표를 문자열로 포맷팅 (표시용)
   * 
   * @param coordinate - 포맷팅할 좌표
   * @param precision - 소수점 자리수 (기본값: 6)
   * @returns 포맷팅된 좌표 문자열
   */
  const formatCoordinate = useCallback((
    coordinate: Coordinate, 
    precision: number = 6
  ): string => {
    if (!isValidCoordinate(coordinate)) {
      return 'Invalid Coordinate';
    }

    const [x, y] = coordinate;
    return `${x.toFixed(precision)}, ${y.toFixed(precision)}`;
  }, [isValidCoordinate]);

  /**
   * 두 좌표 간의 거리 계산 (미터 단위)
   * Haversine 공식 사용
   * 
   * @param coord1 - 첫 번째 좌표 [longitude, latitude]
   * @param coord2 - 두 번째 좌표 [longitude, latitude]
   * @returns 거리 (미터)
   */
  const calculateDistance = useCallback((coord1: Coordinate, coord2: Coordinate): number => {
    if (!isValidCoordinate(coord1) || !isValidCoordinate(coord2)) {
      throw new Error(BOOKMARK_CONFIG.ERROR_MESSAGES.INVALID_COORDINATE);
    }

    const [lon1, lat1] = coord1;
    const [lon2, lat2] = coord2;

    const R = 6371000; // 지구 반지름 (미터)
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a = 
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }, [isValidCoordinate]);

  return {
    transformToWGS84,
    transformToWebMercator,
    isValidCoordinate,
    formatCoordinate,
    calculateDistance,
  };
};