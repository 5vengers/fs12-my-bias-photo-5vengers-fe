'use client';

import { useState } from 'react';

const useValidation = () => {
  const [error, setError] = useState({
    isError: false,
    errMsg: '',
  });

  const validation = (type, value) => {
    const regEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (!value) {
      setError({
        isError: true,
        errMsg: '필수 입력사항입니다.',
      });
      return;
    }

    if (value !== value.trim()) {
      setError({
        isError: true,
        errMsg: '앞 뒤 공백은 사용할 수 없습니다.',
      });
      return;
    }

    if (type === 'text') {
      if (value.length > 30) {
        setError({
          isError: true,
          errMsg: '포토카드 이름은 30자를 초과할 수 없습니다.',
        });

        return;
      }
    }

    if (type === 'email') {
      if (!regEmail.test(value)) {
        setError({
          isError: true,
          errMsg: '이메일 형식이 아닙니다.',
        });

        return;
      }
    }

    setError({
      isError: false,
      errMsg: '',
    });
  };

  return { validation, error, setError };
};

export default useValidation;
