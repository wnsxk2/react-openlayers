import { getBookmarks } from '@/entities/map/api/bookmark';
import { useQuery } from '@tanstack/react-query';

export const useGetBookmark = () => {
  const { data, ...rest } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: getBookmarks,
  });

  return { data: data, bookmarkList: data?.features, ...rest };
};
