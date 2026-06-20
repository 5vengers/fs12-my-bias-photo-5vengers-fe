'use client';

import { useEffect } from 'react';
import useAuthStore from '@/store/authStore';
import useNotificationStore from '@/store/notificationStore';
import { executeRefresh } from '@/libs/apiClient';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

/**
 * SSE 연결 관리 훅
 *
 * - accessToken 존재 시에만 연결
 * - 'connected' 이벤트: unreadCount 배지 초기화
 * - 'notification' 이벤트: 실시간 알림 store에 prepend
 * - onerror 발생 시 executeRefresh() 시도 후 새 토큰으로 1회 재연결
 *   (재연결 실패 시 executeRefresh 내부에서 clearAuth 처리)
 * - 컴포넌트 unmount 또는 accessToken 변경 시 기존 연결 종료
 */
const useSSE = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const { prependNotification, setUnreadCount } = useNotificationStore();

  useEffect(() => {
    if (!accessToken) return;

    let es = null;
    let retried = false;
    let cancelled = false;

    const connect = (token) => {
      if (cancelled) return;

      es = new EventSource(
        `${BASE_URL}/api/notifications/stream?token=${token}`,
      );

      // 연결 직후 미읽은 알림 수 수신 → 배지 초기화
      es.addEventListener('connected', (e) => {
        try {
          const { unreadCount } = JSON.parse(e.data);
          setUnreadCount(unreadCount);
        } catch (err) {
          console.error('[SSE] connected 이벤트 파싱 실패:', err);
        }
      });

      // 실시간 알림 수신 → store prepend
      es.addEventListener('notification', (e) => {
        try {
          const notification = JSON.parse(e.data);
          prependNotification(notification);
        } catch (err) {
          console.error('[SSE] notification 이벤트 파싱 실패:', err);
        }
      });

      // 연결 오류: 토큰 재발급 후 1회 재연결 시도
      es.onerror = async () => {
        es.close();

        // EventSource 자동 재연결 방지
        if (cancelled || retried) return;
        retried = true;

        try {
          const { accessToken: newToken } = await executeRefresh();
          connect(newToken);
        } catch {
          // refresh 실패 → executeRefresh 내부에서 clearAuth 처리됨
        }
      };
    };

    connect(accessToken);

    return () => {
      cancelled = true;
      es?.close();
    };
  }, [accessToken]); // accessToken 변경(재로그인) 시 재연결
};

export default useSSE;
