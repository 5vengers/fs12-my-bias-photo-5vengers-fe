'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMarkAsRead } from '@/hooks/queries/useNotification';
import { getNotificationRoute } from '@/constants/notificationRoutes';
import { getExchangeProposalDetail } from '@/libs/service/marketService';

/**
 * 알림 아이템
 *
 * 클릭 시:
 * 1. 미읽음 상태면 읽음 처리 API 호출 (store는 낙관적 업데이트)
 * 2-a. routeType이 EXCHANGE_PROPOSAL이면 targetId(proposalId)로
 *      getExchangeProposalDetail() 호출해 marketItemId를 조회 후 라우팅
 *      (targetId가 marketItemId가 아니라 proposalId라서 별도 조회 필요)
 * 2-b. 그 외(MARKET_ITEM, MY_SELL_CARDS)는 targetId로 바로 라우팅
 * 3. 드롭다운 닫기
 */
const NotificationItem = ({ notification, onClose }) => {
  const router = useRouter();
  const { mutate: markAsRead } = useMarkAsRead();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleClick = async () => {
    if (isNavigating) return; // 중복 클릭 방지
    setIsNavigating(true);

    if (!notification.isRead) {
      markAsRead(notification.id);
    }

    try {
      // EXCHANGE_PROPOSAL 알림 클릭 시 마켓 상세 페이지로 이동
      if (notification.routeType === 'EXCHANGE_PROPOSAL') {
        const { marketItemId } = await getExchangeProposalDetail(
          notification.targetId,
        );
        router.push(`/market/${marketItemId}`);
      } else {
        const route = getNotificationRoute(
          notification.routeType,
          notification.targetId,
        );
        router.push(route);
      }
    } catch (err) {
      console.error('[NotificationItem] 페이지 이동 실패:', err);
    } finally {
      onClose();
    }
  };

  return (
    <li
      className={`flex min-h-[107px] w-[300px] cursor-pointer items-center justify-center border-b border-gray-500 px-5 ${notification.isRead ? 'bg-transparent' : 'bg-gray-500'}`}
    >
      <button
        type="button"
        onClick={handleClick}
        className="flex h-full w-full cursor-pointer items-center justify-center px-5 text-left"
      >
        <div className="flex h-[67px] w-[260px] flex-col items-start gap-2.5">
          <p className="font-noto line-clamp-2 w-[260px] text-sm leading-normal font-normal text-white">
            {notification.message}
          </p>
          <span className="font-noto w-[260px] text-xs leading-normal font-light text-gray-300">
            {notification.timeAgo}
          </span>
        </div>
      </button>
    </li>
  );
};

export default NotificationItem;
