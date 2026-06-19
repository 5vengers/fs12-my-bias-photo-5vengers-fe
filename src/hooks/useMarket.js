import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getMarketItemDetail,
  purchaseMarketItem,
  createExchangeProposal,
  getReceivedExchangeProposals,
  approveExchangeProposal,
  rejectExchangeProposal,
  deleteMarketItem,
} from '@/libs/service/marketService';
import { POINT_QUERY_KEYS } from '@/hooks/usePoint';

// 마켓 아이템 상세 조회 쿼리 키
export const MARKET_QUERY_KEYS = {
  DETAIL: (itemId) => ['marketItems', 'detail', itemId],
  RECEIVED_EXCHANGES: ['exchanges', 'received'],
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

// 마켓 아이템 교환 제안 생성 훅
export const useCreateExchangeProposal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExchangeProposal,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: MARKET_QUERY_KEYS.DETAIL(variables.itemId),
      });
      queryClient.invalidateQueries({ queryKey: ['marketItems'] });
      queryClient.invalidateQueries({ queryKey: ['myCards'] });
    },
  });
};
// 판매자가 받은 교환 제시 목록을 조회하는 훅
export const useReceivedExchangeProposals = (enabled = true) => {
  return useQuery({
    queryKey: MARKET_QUERY_KEYS.RECEIVED_EXCHANGES,
    queryFn: getReceivedExchangeProposals,
    enabled,
  });
};

// 판매자가 받은 교환 제시를 승인하는 훅
export const useApproveExchangeProposal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveExchangeProposal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: MARKET_QUERY_KEYS.RECEIVED_EXCHANGES,
      });
      queryClient.invalidateQueries({ queryKey: ['marketItems'] });
      queryClient.invalidateQueries({ queryKey: ['myCards'] });
    },
  });
};

// 판매자가 받은 교환 제시를 거절하는 훅
export const useRejectExchangeProposal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectExchangeProposal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: MARKET_QUERY_KEYS.RECEIVED_EXCHANGES,
      });
      queryClient.invalidateQueries({ queryKey: ['marketItems'] });
    },
  });
};

// 판매자가 등록한 마켓 판매글을 삭제하는 훅
export const useDeleteMarketItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMarketItem,
    onSuccess: (_, itemId) => {
      queryClient.invalidateQueries({
        queryKey: MARKET_QUERY_KEYS.DETAIL(itemId),
      });
      queryClient.invalidateQueries({ queryKey: ['marketItems'] });
    },
  });
};
