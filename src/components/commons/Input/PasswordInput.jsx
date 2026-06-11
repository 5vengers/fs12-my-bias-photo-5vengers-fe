'use client';

import useValidation from '@/hooks/useValidation';
import Image from 'next/image';
import VisibleIcon from '@/assets/icons/ic-visible.svg';
import InVisibleIcon from '@/assets/icons/ic-invisible.svg';
import { useState } from 'react';

/*
  password = 패스워드
  setPassword = 패스워드 입력
  checkPassword = 비밀번호 확인일 경우
  type = 'text' or 'password'
  placeholder = input 에 들어갈 placeholder
  id = input id 
  size = 'lg' or 'sm' | 'sm'일 시 text 크기 작아짐
*/

const PasswordInput = ({
  password,
  setPassword,
  checkPassword,
  type,
  placeholder,
  id,
  size = 'lg',
}) => {
  const { validation, error, setError } = useValidation();
  const [showPassword, setShowPassword] = useState(false);

  const sizeStyle = {
    sm: 'text-sm',
    lg: '',
  };

  const handlePasswordCheck = () => {
    validation(type, password);
    errorPassword(password);
  };

  const errorPassword = (p) => {
    if (type === 'check') {
      if (p !== checkPassword) {
        setError({
          isError: true,
          errMsg: '비밀번호가 일치하지 않습니다.',
        });
      }
    }
  };

  return (
    <div>
      <div className="relative flex items-center justify-between">
        <input
          className={`mt-[20px] w-full border border-gray-200 px-[20px] py-[18px] text-white ${sizeStyle[size]} ${error.isError ? 'border-red' : ''}`}
          id={id}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          onChange={(e) => {
            setPassword(e.target.value);
            handlePasswordCheck();
          }}
          onBlur={() => handlePasswordCheck()}
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-[38px] right-[20px] cursor-pointer"
        >
          {showPassword ? (
            <Image
              src={VisibleIcon}
              alt="비밀번호 보이기"
              width={24}
              height={24}
            />
          ) : (
            <Image
              src={InVisibleIcon}
              alt="비밀번호 숨기기"
              width={24}
              height={24}
            />
          )}
        </span>
      </div>
      {error.isError && <span className="text-red">{error.errMsg}</span>}
    </div>
  );
};

export default PasswordInput;
