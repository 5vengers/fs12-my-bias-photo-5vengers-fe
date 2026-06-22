import { create } from 'zustand';

/**
 * 알림 전역 상태 관리 (Zustand)
 *
 * 데이터 흐름:
 * - SSE 연결 시 'connected' 이벤트 -> unreadCount 초기화
 * - SSE 'notification' 이벤트 -> 최신 알림 prepend + unreadCount 갱신
 * - 드롭다운 열릴 때 REST API 조회 -> notifications 갱신 (서버 기준 동기화)
 * - 읽음 처리 -> local optimistic update (unreadCount 즉시 감소)
 */
const useNotificationStore = create((set) => ({
  notifications: [],
  unreadCount: 0,

  // ─── SSE / REST 데이터 설정 ───────────────────────────────
  /** REST 응답으로 목록 전체 교체 */
  setNotifications: (notifications) => set({ notifications }),

  /**
   * SSE 실시간 알림 수신 시 최신 알림을 앞에 삽입
   * unreadCount는 SSE 페이로드의 값으로 갱신
   */
  prependNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications].slice(0, 20),
      unreadCount: notification.unreadCount ?? state.unreadCount,
    })),

  /** SSE connected 이벤트 또는 외부에서 unreadCount만 갱신 */
  setUnreadCount: (unreadCount) => set({ unreadCount }),

  // ─── 읽음 처리 (낙관적 업데이트) ─────────────────────────
  /** 전체 읽음 처리 */
  markAllReadLocal: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    })),

  /**
   * 단일 읽음 처리
   * 해당 알림이 unread였을 경우에만 unreadCount 1 감소
   */
  markOneReadLocal: (id) =>
    set((state) => {
      const target = state.notifications.find((n) => n.id === id);
      const wasUnread = target?.isRead === false;
      return {
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, isRead: true } : n,
        ),
        unreadCount: wasUnread
          ? Math.max(0, state.unreadCount - 1)
          : state.unreadCount,
      };
    }),

  // ─── 로그아웃 시 초기화 ────────────────────────────────────
  reset: () => set({ notifications: [], unreadCount: 0 }),
}));

export default useNotificationStore;