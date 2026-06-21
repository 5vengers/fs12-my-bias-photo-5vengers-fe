'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import alarmDefaultIcon from '@/assets/icons/ic-alarm-default.svg';
import alarmActiveIcon from '@/assets/icons/ic-alarm-active.svg';
import useNotificationStore from '@/store/notificationStore';
import NotificationDropdown from './NotificationDropdown';

/**
 * 알림 벨 아이콘 + 드롭다운
 *
 * - unreadCount > 0 -> ic-alarm-active.svg
 * - unreadCount === 0 -> ic-alarm-default.svg
 *
 * 외부 클릭 감지:
 * - containerRef로 벨 버튼 + 드롭다운을 감싸서 클릭 영역 통합
 * - 컨테이너 외부 클릭 시 드롭다운 닫힘
 */
const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const unreadCount = useNotificationStore((s) => s.unreadCount);

  const hasUnread = unreadCount > 0;

  // 컨테이너 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label={hasUnread ? `알림 (${unreadCount}개 미읽음)` : '알림'}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex cursor-pointer items-center justify-center border-0 bg-transparent p-0"
      >
        <Image
          src={hasUnread ? alarmActiveIcon : alarmDefaultIcon}
          width={24}
          height={24}
          alt=""
        />
      </button>

      {isOpen && <NotificationDropdown onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default NotificationBell;
