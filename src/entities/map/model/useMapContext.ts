import MapContext from '@/entities/map/model/MapContext';
import { useContext } from 'react';

export function useMapContext() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('변경 중 오류가 발생했습니다.');
  }
  return context;
}
