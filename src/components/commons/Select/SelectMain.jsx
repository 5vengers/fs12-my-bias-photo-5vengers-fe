'use client';

import useMouseOut from '@/hooks/useMouseOut';
import Image from 'next/image';
import UpIcon from '@/assets/icons/ic-up.svg';
import DownIcon from '@/assets/icons/ic-down.svg';
import { createContext, useState } from 'react';

const SelectMain = ({ children, name, size = 'lg', value = '', onChange }) => {
  const sizeStyle = {
    sm: 'w-[345px]',
    md: 'w-[440px]',
    lg: 'w-[520px]',
  };

  const [isOpen, setIsOpen] = useState(false);
  const { ref } = useMouseOut({ setIsOpen });

  return (
    <div ref={ref} className={`${sizeStyle[size]}`}>
      <button
        className={`flex w-full items-center justify-between border border-white px-[20px] py-[18px]`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value ? value : `${name}을 선택해주세요`}{' '}
        {isOpen ? (
          <Image src={UpIcon} alt="옵션 닫기" width={24} height={24} />
        ) : (
          <Image src={DownIcon} alt="옵션 열기 " width={24} height={24} />
        )}
      </button>
      {isOpen && (
        <div
          className={`my-[5px] flex flex-col gap-[20px] border border-white p-[20px]`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default SelectMain;
