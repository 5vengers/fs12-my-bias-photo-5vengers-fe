import apiClient from '../apiClient';

// 알림 목록 조회 (최신순, 페이지네이션)
export const getNotifications = async ({ page = 1, limit = 5 } = {}) => {
  const response = await apiClient.get('/api/notifications', {
    params: { page, limit },
  });

  return response.data.data;
};

// 전체 읽음 처리
export const markAllAsRead = async () => {
  const response = await apiClient.patch('/api/notifications/read');

  return response.data;
};

// 단일 알림 읽음 처리
export const markAsRead = async (id) => {
  const response = await apiClient.patch(`/api/notifications/${id}/read`);

  return response.data;
};
