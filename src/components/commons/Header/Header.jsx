'use client';

import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/images/img-logo.svg';
import alramIcon from '@/assets/icons/ic-alarm-default.svg';
import { useLogout } from '@/hooks/useAuth';
import useAuthStore from '@/store/authStore';
import styles from './Header.module.css';

const Header = () => {
  const user        = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isLoggedIn  = !!(user && accessToken);
  const point       = user?.point ?? 0;
  const { mutate: logout } = useLogout();

  return (
    <div className="flex items-center justify-between px-[220px] py-[27px]">
      <div className="cursor-pointer">
        <Link href="/">
          <Image src={Logo} width={140} height={25} alt="최애의 포토 로고" />
        </Link>
      </div>

      <ul className="flex items-center justify-center gap-[30px] text-sm">
        {isLoggedIn ? (
          <>
            <li className="font-bold text-main">
              {point.toLocaleString()} P
            </li>
            <li className="cursor-pointer">
              <Image src={alramIcon} width={24} height={24} alt="알림 아이콘" />
            </li>
            <li className="text-white font-medium">
              <Link href="/myCards">나의 포토카드</Link>
            </li>
            <li className="text-white font-medium">
              <Link href="/mySales">나의 판매 포토카드</Link>
            </li>
            <li className={styles.gray}>
              <span className="text-white font-medium">{user?.nickname}</span>
            </li>
            <li className={styles.gray}>|</li>
            <li className={styles.gray}>
              <button
                onClick={() => logout()}
                className="bg-transparent border-none cursor-pointer text-inherit text-sm p-0"
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
