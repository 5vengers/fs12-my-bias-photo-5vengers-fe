'use client';

import { useNotifications } from '@/hooks/queries/useNotification';
import useNotificationStore from '@/store/notificationStore';
import NotificationItem from './NotificationItem';

/**
 * 알림 드롭다운
 *
 * - 마운트 시 REST API로 최신 5개 조회 -> store 동기화
 * - SSE로 실시간 수신된 알림은 store를 통해 자동 반영
 * - 외부 클릭 감지는 NotificationBell의 containerRef에서 처리
 */
const NotificationDropdown = ({ onClose }) => {
  const notifications = useNotificationStore((s) => s.notifications);
  const { isLoading, isError } = useNotifications({ page: 1, limit: 5 });

  const displayedNotifications = notifications.slice(0, 5);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div
          style={{
            height: '107px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#A4A4A4',
            fontFamily: '"Noto Sans KR"',
            fontSize: '14px',
          }}
        >
          로딩 중...
        </div>
      );
    }

    if (isError) {
      return (
        <div
          style={{
            height: '107px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#A4A4A4',
            fontFamily: '"Noto Sans KR"',
            fontSize: '14px',
          }}
        >
          알림을 불러올 수 없습니다.
        </div>
      );
    }

    if (displayedNotifications.length === 0) {
      return (
        <div
          style={{
            height: '107px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#A4A4A4',
            fontFamily: '"Noto Sans KR"',
            fontSize: '14px',
          }}
        >
          새로운 알림이 없습니다.
        </div>
      );
    }

    return (
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {displayedNotifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClose={onClose}
          />
        ))}
      </ul>
    );
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 'calc(100% + 12px)',
        right: 0,
        width: '300px',
        backgroundColor: '#1c1c1c',
        borderRadius: '4px',
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6)',
        zIndex: 100,
      }}
    >
      {renderContent()}
    </div>
  );
};

export default NotificationDropdown;
