import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getNotifications,
  markAllAsRead,
  markAsRead,
} from '@/libs/service/notificationService';
import useNotificationStore from '@/store/notificationStore';

export const NOTIFICATION_KEYS = {
  list: (params) => ['notifications', 'list', params],
};

/**
 * 알림 목록 조회
 * 드롭다운이 열릴 때마다 서버 기준으로 동기화 (staleTime: 0)
 */
export const useNotifications = (params = { page: 1, limit: 5 }) => {
  const setNotifications = useNotificationStore((s) => s.setNotifications);
  const setUnreadCount = useNotificationStore((s) => s.setUnreadCount);

  return useQuery({
    queryKey: NOTIFICATION_KEYS.list(params),
    queryFn: async () => {
      const data = await getNotifications(params);
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
      return data;
    },
    staleTime: 0, // 드롭다운 열릴 때마다 항상 최신 데이터 조회
  });
};

/**
 * 단일 알림 읽음 처리
 * onSuccess: store 낙관적 업데이트 (unreadCount 즉시 감소)
 */
export const useMarkAsRead = () => {
  const markOneReadLocal = useNotificationStore((s) => s.markOneReadLocal);

  return useMutation({
    mutationFn: (id) => markAsRead(id),
    onSuccess: (_, id) => {
      markOneReadLocal(id);
    },
    onError: (err) => {
      console.error('[useMarkAsRead] 읽음 처리 실패:', err);
    },
  });
};

/**
 * 전체 읽음 처리
 * onSuccess: store 낙관적 업데이트
 */
export const useMarkAllAsRead = () => {
  const markAllReadLocal = useNotificationStore((s) => s.markAllReadLocal);

  return useMutation({
    mutationFn: markAllAsRead,
    onSuccess: () => {
      markAllReadLocal();
    },
    onError: (err) => {
      console.error('[useMarkAllAsRead] 전체 읽음 처리 실패:', err);
    },
  });
};
