import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import pointService from '@/libs/service/pointService';
import { useIsAuthenticated } from '@/hooks/useAuth';

export const POINT_QUERY_KEYS = {
  MY_POINT: ['points', 'me'],
};

// 사용자 포인트 조회 훅
export const useMyPoint = () => {
  const isAuthenticated = useIsAuthenticated();

  return useQuery({
    queryKey: POINT_QUERY_KEYS.MY_POINT,
    queryFn: pointService.getMyPoint,
    enabled: isAuthenticated,
  });
};

// 포인트 박스 오픈 훅
export const useOpenPointBox = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: pointService.openPointBox,
    onSuccess: (result) => {
      queryClient.setQueryData(POINT_QUERY_KEYS.MY_POINT, result.currentPoint);
    },
  });
};

export const usePointTimerInit = () => {
  const isAuthenticated = useIsAuthenticated();

  return useQuery({
    queryKey: ['timer'],
    queryFn: () => {
      const savedTime = localStorage.getItem('point_time');
      return savedTime ? Number(savedTime) : null;
    },
    enabled: isAuthenticated,
  });
};
