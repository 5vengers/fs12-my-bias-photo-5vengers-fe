import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getMarketItems, createMarketItem } from '@/libs/service/marketService';
import apiClient from '@/libs/apiClient';
import { useMutation } from '@tanstack/react-query';

export const useMarketItems = (params) => {
  const query = useInfiniteQuery({
    queryKey: ['marketItems', params],
    queryFn: ({ pageParam }) => getMarketItems({ pageParam, ...params }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  return {
    ...query,
    allItems: query.data?.pages.flatMap((page) => page.items) || [],
  };
};

export const useMyCards = ({ grade, genre, keyword } = {}) => {
  return useQuery({
    queryKey: ['myCards', grade, genre, keyword],
    queryFn: async () => {
      const res = await apiClient.get('/api/myGallery', {
        params: {
          ...(grade && { grade }),
          ...(genre && { genre }),
          ...(keyword && { keyword }),
        },
      });
      return res.data.data.cards;
    },
  });
};

export function useCreateMarketItem(options = {}) {
  return useMutation({
    mutationFn: createMarketItem,
    ...options,
  });
}
