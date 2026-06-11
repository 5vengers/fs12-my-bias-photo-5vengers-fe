'use client';

import useMouseOut from '@/hooks/useMouseOut';
import Image from 'next/image';
import UpIcon from '@/assets/icons/ic-up.svg';
import DownIcon from '@/assets/icons/ic-down.svg';
import { createContext, useState } from 'react';

const SelectMain = ({ children, desc, size = 'lg', value = '', onChange }) => {
  const sizeStyle = {
    noLine: 'w-fit',
    xs: 'w-[180px] h-[50px]',
    sm: 'w-[345px]',
    md: 'w-[440px]',
    lg: 'w-[520px]',
  };
  const buttonStyle = {
    noLine: 'font-bold',
    xs: 'border border-white px-[20px] py-[13px]',
    sm: 'border border-white px-[20px] py-[18px]',
    md: 'border border-white px-[20px] py-[18px]',
    lg: 'border border-white px-[20px] py-[18px]',
  };

  const [isOpen, setIsOpen] = useState(false);
  const { ref } = useMouseOut({ setIsOpen });

  return (
    <div ref={ref} className={`${sizeStyle[size]}`}>
      <button
        className={`flex w-full items-center justify-between ${buttonStyle[size]}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value ? value : `${desc}`}{' '}
        {isOpen ? (
          <Image src={UpIcon} alt="옵션 닫기" width={24} height={24} />
        ) : (
          <Image src={DownIcon} alt="옵션 열기 " width={24} height={24} />
        )}
      </button>
      {isOpen && (
        <div
          className={`absolute z-[10] my-[5px] flex min-w-[100px] flex-col items-start gap-[20px] border border-white p-[20px]`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default SelectMain;
