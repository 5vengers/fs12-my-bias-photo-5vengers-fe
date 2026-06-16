import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getMarketItems } from '@/libs/service/marketService';

export const useMarketItems = () => {
  const query = useInfiniteQuery({
    queryKey: ['marketItems'],
    queryFn: getMarketItems,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  return {
    ...query,
    allItems: query.data?.pages.flatMap((page) => page.items) || [],
  };
};

export const useMyCards = () => {
  return useQuery({
    queryKey: ['myCards'],
    queryFn: async () => {
      const res = await apiClient.get('/api/myGallery');
      return res.data.data;
    },
  });
};
