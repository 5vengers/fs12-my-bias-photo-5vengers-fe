import { useQuery } from '@tanstack/react-query';
import pointService from '@/libs/service/pointService';
import { useIsAuthenticated } from '@/hooks/useAuth';

export const POINT_QUERY_KEYS = {
  MY_POINT: ['points', 'me'],
};

export const useMyPoint = () => {
  const isAuthenticated = useIsAuthenticated();

  return useQuery({
    queryKey: POINT_QUERY_KEYS.MY_POINT,
    queryFn: pointService.getMyPoint,
    enabled: isAuthenticated,
  });
};