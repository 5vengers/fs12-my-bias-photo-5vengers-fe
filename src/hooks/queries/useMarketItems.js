import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getMarketItems } from '@/libs/service/marketService';
import apiClient from '@/libs/apiClient';

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
  console.log('useMyCards HOOK CALLED');
  return useQuery({
    queryKey: ['myCards'],
    queryFn: async () => {
      const res = await apiClient.get('/api/myGallery');
      console.log(res);
      return res.data.data;
    },
  });
};
