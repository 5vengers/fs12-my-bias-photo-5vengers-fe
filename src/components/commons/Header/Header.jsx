'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Logo from '@/assets/images/img-logo.svg';
import alramIcon from '@/assets/icons/ic-alarm-default.svg';
import useAuthStore from '@/store/useAuthStore';
import { logout as logoutApi } from '@/libs/authApi';
import styles from './Header.module.css';

const Header = () => {
  const router = useRouter();
  const { isLoggedIn, user, point, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch {
      // 서버 오류여도 클라이언트 상태는 초기화
    } finally {
      logout();
      router.push('/login');
    }
  };

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
            <li className="font-bold" style={{ color: '#EFFF04' }}>
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
              <span style={{ color: 'var(--white)', fontWeight: 500 }}>{user?.nickname}</span>
            </li>
            <li className={styles.gray}>|</li>
            <li className={styles.gray}>
              <button
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'inherit',
                  fontSize: 'inherit',
                  padding: 0,
                }}
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
