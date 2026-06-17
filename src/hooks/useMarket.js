import { useQuery } from '@tanstack/react-query';
import { getMarketItemDetail } from '@/libs/service/marketService';

export const MARKET_QUERY_KEYS = {
  DETAIL: (itemId) => ['marketItems', 'detail', itemId],
};

export const useMarketItemDetail = (itemId) => {
  return useQuery({
    queryKey: MARKET_QUERY_KEYS.DETAIL(itemId),
    queryFn: () => getMarketItemDetail(itemId),
    enabled: !!itemId,
  });
};
