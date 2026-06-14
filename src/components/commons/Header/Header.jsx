'use client';

import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/images/img-logo.svg';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className="grid grid-cols-3 items-center px-[220px] py-[27px]">
      <div className="cursor-pointer">
        <Link href="/">
          <Image src={Logo} width={140} height={25} alt="최애의 포토 로고" />
        </Link>
      </div>

      <div />

      <ul className="flex items-center justify-end gap-[10px] text-sm">
        <li className={styles.gray}>|</li>
        <li className="text-white font-medium">
          <Link href="/login">로그인</Link>
        </li>
        <li className="text-white font-medium">
          <Link href="/register">회원가입</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
