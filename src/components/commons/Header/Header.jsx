'use client';

import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/images/img-logo.svg';
import PointIcon from '@/assets/icons/ico-point.svg';
import styles from './Header.module.css';
import useAuthStore from '@/store/authStore';
import { useIsAuthenticated, useLogout } from '@/hooks/useAuth';
import { useMyPoint } from '@/hooks/usePoint';
import Profile from './Profile';
import { useState } from 'react';
import { useSurpriseModalStore } from '@/store/supriseStore';
import NotificationBell from '@/components/commons/Notification/NotificationBell';

const Header = () => {
  const user = useAuthStore((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);

  const isLogin = useIsAuthenticated();
  const { mutate: logout } = useLogout();

  const { data: point, isPending, isError } = useMyPoint();

  // 깜짝 모달 관리
  // open -> 모달 open
  // canGetPoint => 지금 포인트를 얻을 수 있는지 없는지 판단
  const { open, canGetPoint } = useSurpriseModalStore();

  const pointbedge =
    'after:bg-red after:absolute after:top-[-2px] after:right-[-5px] after:z-[10] after:size-[10px] after:rounded-[100%]';

  const pointText = (() => {
    if (isPending) return '... P';
    if (isError || typeof point !== 'number' || !Number.isFinite(point)) {
      return '-- P';
    }

    return `${point.toLocaleString('ko-KR')} P`;
  })();

  return (
    <div className="flex items-center justify-between px-[220px] py-[27px]">
      <div className="cursor-pointer">
        <Link href="/">
          <Image
            src={Logo}
            width={140}
            height={25}
            alt="최애의 포토 로고"
            priority
          />
        </Link>
      </div>

      <ul className={`flex items-center justify-center gap-[30px] text-sm`}>
        {isLogin ? (
          <>
            <li className="font-bold text-gray-200">{pointText}</li>
            <li className="flex items-center justify-center">
              <button
                type="button"
                aria-label="포인트 팝업"
                onClick={open}
                className={`relative ${canGetPoint ? pointbedge : ''}`}
              >
                <Image src={PointIcon} width={20} height={20} alt="포인트" />
              </button>
            </li>
            <li>
              <NotificationBell />
            </li>
            <li className="font-baskin relative text-[18px] font-normal tracking-[-0.54px] text-gray-200">
              <button type="button" onClick={() => setIsOpen(!isOpen)}>
                {user?.nickname}
              </button>
              {isOpen && (
                <Profile
                  username={user?.nickname || '회원'}
                  point={pointText}
                  setIsOpen={setIsOpen}
                />
              )}
            </li>
            <li className={styles.gray}>|</li>
            <li>
              <button
                type="button"
                className="cursor-pointer"
                onClick={() => logout()}
              >
                로그아웃
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">로그인</Link>
            </li>
            <li>
              <Link href="/register">회원가입</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
