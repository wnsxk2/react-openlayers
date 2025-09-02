import { postBookmark } from '@/entities/map/api/bookmark';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostBookmark = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postBookmark,
    mutationKey: ['post-bookmark'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
};
