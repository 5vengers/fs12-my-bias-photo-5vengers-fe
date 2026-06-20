import apiClient from '@/libs/apiClient';

export const notificationApi = {
  /**
   * 알림 목록 조회 (최신순, 페이지네이션)
   * @returns {{ notifications, pagination, unreadCount }}
   */
  getNotifications: async ({ page = 1, limit = 5 } = {}) => {
    const res = await apiClient.get('/api/notifications', {
      params: { page, limit },
    });
    return res.data.data;
  },

  /**
   * 전체 읽음 처리
   */
  markAllAsRead: async () => {
    const res = await apiClient.patch('/api/notifications/read');
    return res.data;
  },

  /**
   * 단일 읽음 처리
   * @param {number} id
   */
  markAsRead: async (id) => {
    const res = await apiClient.patch(`/api/notifications/${id}/read`);
    return res.data;
  },
};
