'use client';

import Link from 'next/link';

import Image from 'next/image';
import Logo from '@/assets/images/img-logo.svg';
import alramIcon from '@/assets/icons/ic-alarm-default.svg';

import styles from './Header.module.css';

const Header = ({ isLogin }) => {
  return (
    <div className="flex items-center justify-between px-[220px] py-[27px]">
      <div className="cursor-pointer">
        <Image src={Logo} width={140} height={25} alt="최애의 포토 로고" />
      </div>

      <ul className={`flex items-center justify-center gap-[30px] text-sm`}>
        {isLogin ? (
          <>
            <li>1500 p</li>
            <li className="cursor-pointer">
              <Image src={alramIcon} width={24} height={24} alt="알림 아이콘" />
            </li>
            <li>닉네임</li>
            <li className={styles.gray}>|</li>
            <li className={styles.gray}>
              <Link href="/logout">로그아웃</Link>
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
