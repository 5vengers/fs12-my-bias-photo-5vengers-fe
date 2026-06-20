'use client';

import { useRouter } from 'next/navigation';
import { useMarkAsRead } from '@/hooks/queries/useNotification';
import { getNotificationRoute } from '@/constants/notificationRoutes';

/**
 * 알림 아이템
 *
 * 클릭 시:
 * 1. 미읽음 상태면 읽음 처리 API 호출 (store는 낙관적 업데이트)
 * 2. routeType + targetId 기반으로 해당 페이지 이동
 * 3. 드롭다운 닫기
 */
const NotificationItem = ({ notification, onClose }) => {
  const router = useRouter();
  const { mutate: markAsRead } = useMarkAsRead();

  const handleClick = () => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }

    const route = getNotificationRoute(
      notification.routeType,
      notification.targetId,
    );
    router.push(route);
    onClose();
  };

  return (
    <li
      onClick={handleClick}
      style={{
        width: '300px',
        minHeight: '107px',
        backgroundColor: notification.isRead ? 'transparent' : '#2b2b2b',
        borderBottom: '1px solid #333',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 20px',
        boxSizing: 'border-box',
        listStyle: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '260px',
          height: '67px',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '10px',
        }}
      >
        <p
          style={{
            color: 'var(--white-white, #FFF)',
            fontFamily: '"Noto Sans KR"',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: 'normal',
            width: '260px',
            margin: 0,
            // 2줄 이상 넘치면 말줄임
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {notification.message}
        </p>
        <span
          style={{
            color: 'var(--gray-gray300, #A4A4A4)',
            fontFamily: '"Noto Sans KR"',
            fontSize: '12px',
            fontWeight: 300,
            lineHeight: 'normal',
            width: '260px',
          }}
        >
          {notification.timeAgo}
        </span>
      </div>
    </li>
  );
};

export default NotificationItem;
