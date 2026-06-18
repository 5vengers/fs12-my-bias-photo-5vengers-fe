'use client';

import useMouseOut from '@/hooks/useMouseOut';
import Image from 'next/image';
import UpIcon from '@/assets/icons/ic-up.svg';
import DownIcon from '@/assets/icons/ic-down.svg';
import { createContext, useContext, useState } from 'react';

const SelectContext = createContext(null);

/*
  children = Select.Option
  desc = select 내부에 들어갈 값 ('등급' 또는 '등급을 선택해주세요")
  size =  noLine(라인 없는 select box), sm, md, lg 
  value = select 에 표사될 값. 빈 값이면 desc 표시
  onChange = onChange 함수 context api 사용
*/
const SelectMain = ({
  children,
  desc,
  size = 'lg',
  onChange,
  isError = false,
}) => {
  // size에 따라 style 변경
  const sizeStyle = {
    noLine: 'w-fit font-bold gap-[10px]',
    xs: 'w-[180px] h-[50px]',
    sm: 'w-[345px]',
    md: 'w-[440px]',
    lg: 'w-[520px]',
  };
  const buttonStyle = {
    noLine: 'border-transparent whitespace-nowrap',
    xs: 'border border-white px-[20px] py-[13px]',
    sm: 'border border-white px-[20px] py-[18px]',
    md: 'border border-white px-[20px] py-[18px]',
    lg: 'border border-white px-[20px] py-[18px]',
  };

  const [isOpen, setIsOpen] = useState(false);
  const { ref } = useMouseOut({ setIsOpen });

  const [selected, setSelected] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('');

  const handleChange = (value, label) => {
    // 기본적으로 ui 값 변화는 이 곳에서 담당
    setSelected(value);
    setSelectedLabel(label);
    // option 값 선택으로 밖에서 state 관리할때는 이 곳에서 담당
    onChange?.(value);
  };

  return (
    <SelectContext.Provider value={{ selected, selectedLabel, handleChange }}>
      <div ref={ref} className={`relative ${sizeStyle[size]}`}>
        <button
          type="button"
          className={`flex w-full items-center justify-between transition ${buttonStyle[size] || buttonStyle.lg} ${isError ? 'border-red!' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedLabel || desc}
          {isOpen ? (
            <Image src={UpIcon} alt="옵션 닫기" width={24} height={24} />
          ) : (
            <Image src={DownIcon} alt="옵션 열기 " width={24} height={24} />
          )}
        </button>
        {isOpen && (
          <div
            className={`absolute z-50 my-[5px] flex min-w-[100px] flex-col items-start border border-white bg-black ${size === 'noLine' ? 'w-fit' : 'w-full'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {children}
          </div>
        )}
      </div>
    </SelectContext.Provider>
  );
};

// select 안에서만 쓰임
const useSelectContext = () => {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error('Select 컴포넌트 내에서만 사용 가능합니다.');
  }

  return context;
};

export { SelectMain, useSelectContext };
