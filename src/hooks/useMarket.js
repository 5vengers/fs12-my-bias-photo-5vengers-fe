import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getMarketItemDetail,
  purchaseMarketItem,
} from '@/libs/service/marketService';
import { POINT_QUERY_KEYS } from '@/hooks/usePoint';

// 마켓 아이템 상세 조회 쿼리 키
export const MARKET_QUERY_KEYS = {
  DETAIL: (itemId) => ['marketItems', 'detail', itemId],
};

// 마켓 아이템 상세 조회 훅
export const useMarketItemDetail = (itemId) => {
  return useQuery({
    queryKey: MARKET_QUERY_KEYS.DETAIL(itemId),
    queryFn: () => getMarketItemDetail(itemId),
    enabled: !!itemId,
  });
};

// 마켓 아이템 구매 훅
export const usePurchaseMarketItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: purchaseMarketItem,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: MARKET_QUERY_KEYS.DETAIL(variables.itemId),
      });
      queryClient.invalidateQueries({ queryKey: ['marketItems'] });
      queryClient.invalidateQueries({ queryKey: POINT_QUERY_KEYS.MY_POINT });
    },
  });
};
