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
  type = 'password' or 'check'
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
  externalError,
}) => {
  const { validation, error, setError } = useValidation();
  const [showPassword, setShowPassword] = useState(false);

  const displayError = externalError ?? error;

  const sizeStyle = {
    sm: 'text-sm',
    lg: '',
  };

  const handleValidate = (currentValue) => {
    if (type === 'check') {
      if (!currentValue) {
        setError({ isError: true, errMsg: '필수 입력사항입니다.' });
      } else if (currentValue !== checkPassword) {
        setError({ isError: true, errMsg: '비밀번호가 일치하지 않습니다.' });
      } else {
        setError({ isError: false, errMsg: '' });
      }
    } else {
      validation(type, currentValue);
    }
  };

  return (
    <div>
      <div className="relative flex items-center justify-between">
        <input
          className={`mt-[10px] w-full border border-gray-200 bg-black px-[20px] py-[18px] text-white focus:outline-none ${sizeStyle[size]} ${displayError.isError ? 'border-red' : ''}`}
          id={id}
          value={password}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          onChange={(e) => {
            setPassword(e.target.value);
            handleValidate(e.target.value);
          }}
          onBlur={(e) => handleValidate(e.target.value)}
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-[30px] right-[20px] cursor-pointer"
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
      {displayError.isError && (
        <span className="text-red text-sm">{displayError.errMsg}</span>
      )}
    </div>
  );
};

export default PasswordInput;
