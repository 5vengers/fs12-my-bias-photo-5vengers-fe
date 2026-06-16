'use client';

import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/images/img-logo.svg';
import alramIcon from '@/assets/icons/ic-alarm-default.svg';
import styles from './Header.module.css';
import useAuthStore from '@/store/authStore';
import { useIsAuthenticated, useLogout } from '@/hooks/useAuth';
import { useMyPoint } from '@/hooks/usePoint';
/*
  user = 유저 정보
  isLogin = 로그인이 되어있는지
*/
const Header = () => {
  const user = useAuthStore((state) => state.user);
  const isLogin = useIsAuthenticated();
  const { mutate: logout } = useLogout();

  const { data: point, isPending, isError } = useMyPoint();

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
          <Image src={Logo} width={140} height={25} alt="최애의 포토 로고" />
        </Link>
      </div>

      <ul className={`flex items-center justify-center gap-[30px] text-sm`}>
        {isLogin ? (
          <>
            <li className="font-bold text-gray-200">{pointText}</li>
            <li>
              <button type="button" aria-label="알림">
                <Image src={alramIcon} width={24} height={24} alt="" />
              </button>
            </li>
            <li className="font-baskin text-[18px] font-normal tracking-[-0.54px] text-gray-200">
              {user?.nickname}
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
