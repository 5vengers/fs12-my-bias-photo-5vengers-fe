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

  const emptyStateClass =
    'font-noto flex h-[107px] items-center justify-center text-sm text-gray-300';

  const renderContent = () => {
    if (isLoading) {
      return <div className={emptyStateClass}>로딩 중...</div>;
    }

    if (isError) {
      return <div className={emptyStateClass}>알림을 불러올 수 없습니다.</div>;
    }

    if (displayedNotifications.length === 0) {
      return <div className={emptyStateClass}>새로운 알림이 없습니다.</div>;
    }

    return (
      <ul className="m-0 list-none p-0">
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
    <div className="absolute top-[calc(100%+12px)] right-0 z-[100] w-[300px] overflow-hidden rounded bg-gray-500 shadow-lg">
      {renderContent()}
    </div>
  );
};

export default NotificationDropdown;