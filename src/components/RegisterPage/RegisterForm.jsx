'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRegister } from '@/hooks/useAuth';
import Input from '@/components/commons/Input/Input';
import PasswordInput from '@/components/commons/Input/PasswordInput';
import Button from '@/components/commons/Button/Button';
import Logo from '@/assets/images/img-logo.svg';
import GoogleIcon from '@/assets/icons/ic-google.svg';

const EMAIL_REGEX =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

const GOOGLE_AUTH_URL = `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'}/api/auth/google`;

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const { mutate: register, isPending, error: registerError } = useRegister();

  // ─── 클라이언트 유효성 검사 ─────────────────────────────────
  // BE 스키마와 동일한 기준 적용: password 8~20자, nickname 2~20자
  const validate = () => {
    const errors = {};

    if (!email) {
      errors.email = '필수 입력사항입니다.';
    } else if (!EMAIL_REGEX.test(email)) {
      errors.email = '이메일 형식이 아닙니다.';
    }

    if (!nickname) {
      errors.nickname = '필수 입력사항입니다.';
    } else if (nickname.length < 2) {
      errors.nickname = '닉네임은 2자 이상이어야 합니다.';
    } else if (nickname.length > 20) {
      errors.nickname = '닉네임은 20자 이하이어야 합니다.';
    }

    if (!password) {
      errors.password = '필수 입력사항입니다.';
    } else if (password.length < 8) {
      errors.password = '비밀번호는 8자 이상이어야 합니다.';
    } else if (password.length > 20) {
      errors.password = '비밀번호는 20자 이하이어야 합니다.';
    }

    if (!passwordCheck) {
      errors.passwordCheck = '필수 입력사항입니다.';
    } else if (password !== passwordCheck) {
      errors.passwordCheck = '비밀번호가 일치하지 않습니다.';
    }

    return errors;
  };

  const handleSubmit = () => {
    if (isPending) return;

    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    register({ email, nickname, password });
  };

  // BE 에러 메시지
  const apiErrorMsg =
    registerError?.response?.data?.message ?? registerError?.message ?? null;

  // ─── 필드별 setValue 래퍼 (입력 시 submit 에러 클리어) ──────
  const makeSetValue = (setter, field) => (v) => {
    setter(v);
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-start bg-black px-4 py-[60px]">
      <form
        className="w-full max-w-[520px]"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* 로고 */}
        <div className="mb-[50px] flex justify-center">
          <Image
            src={Logo}
            width={330}
            height={60}
            alt="최애의 포토 로고"
            priority
          />
        </div>

        {/* 이메일 */}
        <div>
          <label className="text-sm font-medium text-white" htmlFor="email">
            이메일
          </label>
          <Input
            id="email"
            type="email"
            validationType="email"
            placeholder="이메일을 입력해 주세요"
            value={email}
            setValue={makeSetValue(setEmail, 'email')}
            externalError={
              formErrors.email
                ? { isError: true, errMsg: formErrors.email }
                : undefined
            }
          />
        </div>

        {/* 닉네임 */}
        <div className="mt-[30px]">
          <label className="text-sm font-medium text-white" htmlFor="nickname">
            닉네임
          </label>
          <Input
            id="nickname"
            type="text"
            validationType="nickname"
            placeholder="닉네임을 입력해 주세요"
            value={nickname}
            setValue={makeSetValue(setNickname, 'nickname')}
            externalError={
              formErrors.nickname
                ? { isError: true, errMsg: formErrors.nickname }
                : undefined
            }
          />
        </div>

        {/* 비밀번호 */}
        <div className="mt-[30px]">
          <label className="text-sm font-medium text-white" htmlFor="password">
            비밀번호
          </label>
          <PasswordInput
            id="password"
            password={password}
            setPassword={makeSetValue(setPassword, 'password')}
            type="password"
            placeholder="8자 이상 입력해 주세요"
            externalError={
              formErrors.password
                ? { isError: true, errMsg: formErrors.password }
                : undefined
            }
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className="mt-[30px]">
          <label
            className="text-sm font-medium text-white"
            htmlFor="passwordCheck"
          >
            비밀번호 확인
          </label>
          <PasswordInput
            id="passwordCheck"
            password={passwordCheck}
            setPassword={makeSetValue(setPasswordCheck, 'passwordCheck')}
            checkPassword={password}
            type="check"
            placeholder="비밀번호를 한번 더 입력해 주세요"
            externalError={
              formErrors.passwordCheck
                ? { isError: true, errMsg: formErrors.passwordCheck }
                : undefined
            }
          />
        </div>

        {/* API 에러 */}
        {apiErrorMsg && <p className="text-red mt-3 text-sm">{apiErrorMsg}</p>}

        {/* 가입하기 버튼 */}
        <div className="mt-[50px]">
          <Button btnType="submit" disabled={isPending}>
            {isPending ? '가입 중...' : '가입하기'}
          </Button>
        </div>

        {/* Google 회원가입 버튼 */}
        <div className="mt-[16px]">
          <Button
            type="google"
            onClick={() => {
              window.location.href = GOOGLE_AUTH_URL;
            }}
            disabled={isPending}
          >
            <span className="flex items-center justify-center gap-[10px] font-normal">
              <Image src={GoogleIcon} alt="Google" width={20} height={20} />
              Google로 시작하기
            </span>
          </Button>
        </div>

        {/* 로그인 링크 */}
        <div className="mt-[40px] flex justify-center gap-[10px] text-[16px] text-white">
          <span className="font-normal">이미 최애의 포토 회원이신가요?</span>
          <Link href="/login" className="!text-main font-normal !underline">
            로그인하기
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
