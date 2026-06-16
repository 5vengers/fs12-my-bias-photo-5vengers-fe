import { useInfiniteQuery } from '@tanstack/react-query';
import { getMarketItems } from '@/libs/marketService';

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
