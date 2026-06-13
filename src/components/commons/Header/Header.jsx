'use client';

import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/images/img-logo.svg';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className="flex items-center justify-between px-[220px] py-[27px]">
      <div className="cursor-pointer">
        <Link href="/">
          <Image src={Logo} width={140} height={25} alt="최애의 포토 로고" />
        </Link>
      </div>

      <ul className="flex items-center justify-center gap-[10px] text-sm">
        <li className="text-white font-medium">
          <Link href="/myCards">나의 포토카드</Link>
        </li>
        <li className="text-white font-medium">
          <Link href="/mySales">나의 판매 포토카드</Link>
        </li>
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
