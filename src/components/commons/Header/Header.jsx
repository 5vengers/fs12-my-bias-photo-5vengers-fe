'use client';

import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/images/img-logo.svg';
import alramIcon from '@/assets/icons/ic-alarm-default.svg';
import styles from './Header.module.css';
import useAuthStore from '@/store/authStore';
import { useIsAuthenticated, useLogout } from '@/hooks/useAuth';
/*
  user = 유저 정보
  isLogin = 로그인이 되어있는지
*/
const Header = () => {
  const user = useAuthStore((state) => state.user);
  const isLogin = useIsAuthenticated();
  const { mutate: logout } = useLogout();
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
            <li>1500 p</li> {/*나중에 Point API와 연결*/}
            <li className="cursor-pointer">
              <Image src={alramIcon} width={24} height={24} alt="알림 아이콘" />
            </li>
            <li className="font-baskin text-[18px] font-normal tracking-[-0.54px] text-gray-200">
              {user?.nickname}
            </li>
            <li className={styles.gray}>|</li>
            <li
              className={`${styles.gray} cursor-pointer`}
              onClick={() => logout()}
            >
              로그아웃
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
