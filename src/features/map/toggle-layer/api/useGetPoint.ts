import { getPoint } from '@/entities/map';
import { useQuery } from '@tanstack/react-query';

export function useGetPoint() {
  return useQuery({
    queryKey: ['point'],
    queryFn: getPoint,
  });
}
