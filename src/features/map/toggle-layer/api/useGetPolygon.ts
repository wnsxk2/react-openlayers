import { getPolygon } from '@/entities/map';
import { useQuery } from '@tanstack/react-query';

export function useGetPolygon() {
  return useQuery({
    queryKey: ['polygon'],
    queryFn: getPolygon,
  });
}
