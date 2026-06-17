import { useQuery } from '@tanstack/react-query';
import marketService from '@/libs/service/marketService';

export const MARKET_QUERY_KEYS = {
  DETAIL: (itemId) => ['marketItems', 'detail', itemId],
};

export const useMarketItemDetail = (itemId) => {
  return useQuery({
    queryKey: MARKET_QUERY_KEYS.DETAIL(itemId),
    queryFn: () => marketService.getMarketItemDetail(itemId),
    enabled: !!itemId,
  });
};
