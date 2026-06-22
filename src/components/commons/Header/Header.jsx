'use client';

import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/images/img-logo.svg';
import PointIcon from '@/assets/icons/ic-point.svg';
import MenuIcon from '@/assets/icons/ic-menu.svg';
import styles from './Header.module.css';
import useAuthStore from '@/store/authStore';
import { useIsAuthenticated, useLogout } from '@/hooks/useAuth';
import { useMyPoint } from '@/hooks/usePoint';
import Profile from './Profile';
import { useState } from 'react';
import { useSurpriseModalStore } from '@/store/supriseStore';
import NotificationBell from '@/components/commons/Notification/NotificationBell';
import useMouseOut from '@/hooks/useMouseOut';

const Header = () => {
  const user = useAuthStore((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isLogin = useIsAuthenticated();
  const { mutate: logout } = useLogout();

  const { data: point, isPending, isError } = useMyPoint();
  const { ref } = useMouseOut({ setIsOpen: setIsOpen });
  const { ref: mobileRef } = useMouseOut({ setIsOpen: setIsMobileOpen });

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
    <div className="tablet:px-10 tablet:py-6.5 mobile:p-5 flex items-center justify-between px-55 py-7">
      {/* 모바일 메뉴 */}
      <div className="mobile:block hidden">
        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          aria-label="모바일 메뉴"
        >
          <Image src={MenuIcon} alt="햄버거 메뉴" width={24} height={24} />
        </button>
      </div>

      <div className="cursor-pointer">
        <Link href={isLogin ? '/market' : '/'}>
          <Image
            src={Logo}
            width={140}
            height={25}
            alt="최애의 포토 로고"
            priority
          />
        </Link>
      </div>

      <ul className="mobile:hidden flex items-center justify-center gap-[30px] text-sm">
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
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="프로필"
              >
                {user?.nickname}
              </button>
              {isOpen && (
                <Profile
                  ref={ref}
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
                aria-label="로그아웃"
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

      {/* 모바일 */}
      <div className="mobile:block hidden">
        {isLogin ? <NotificationBell /> : <Link href={'/login'}>로그인</Link>}
      </div>

      <div className="mobile:flex absolute fixed top-0 left-0 z-60 hidden">
        {isMobileOpen && (
          <>
            <div className="z-5 h-screen w-screen bg-black/50"></div>
            {isLogin ? (
              <Profile
                ref={mobileRef}
                username={user?.nickname || '회원'}
                point={pointText}
                setIsOpen={setIsMobileOpen}
              >
                <button
                  type="button"
                  aria-label="모바일 포인트 팝업"
                  onClick={() => {
                    open();
                    setIsMobileOpen(false);
                  }}
                  className={`relative flex w-full items-center justify-between text-sm font-bold ${canGetPoint ? pointbedge : ''}`}
                >
                  포인트 박스 확인{' '}
                  <Image src={PointIcon} width={20} height={20} alt="포인트" />
                </button>
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => logout()}
                  aria-label="모바일 로그아웃"
                >
                  로그아웃
                </button>
              </Profile>
            ) : (
              <div
                ref={mobileRef}
                className="absolute top-0 left-0 z-4 h-screen w-65 bg-gray-500"
              >
                <div className="flex flex-col items-start gap-5 border-b border-gray-300 p-5">
                  <Image
                    src={Logo}
                    alt={'모바일 로고'}
                    width={140}
                    height={25}
                    priority
                  />
                </div>
                <nav className="flex flex-col items-start gap-4 p-5">
                  <Link href="/register" className="text-sm font-bold">
                    회원가입
                  </Link>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
