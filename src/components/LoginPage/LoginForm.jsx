'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLogin } from '@/hooks/useAuth';
import Input from '@/components/commons/Input/Input';
import PasswordInput from '@/components/commons/Input/PasswordInput';
import Button from '@/components/commons/Button/Button';
import Logo from '@/assets/images/img-logo.svg';
import GoogleIcon from '@/assets/icons/ic-google.svg';

const EMAIL_REGEX =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

// Google OAuth: 브라우저를 BE 엔드포인트로 직접 이동시켜 리다이렉트 흐름 시작
const GOOGLE_AUTH_URL = `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'}/api/auth/google`;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // submit 시 빈 필드·형식 오류를 Input에 내려줄 에러 상태
  const [formErrors, setFormErrors] = useState({});

  const { mutate: login, isPending, error: loginError } = useLogin();

  // ─── 클라이언트 유효성 검사 ───────────────────────────
  const validate = () => {
    const errors = {};
    if (!email) {
      errors.email = '필수 입력사항입니다.';
    } else if (!EMAIL_REGEX.test(email)) {
      errors.email = '이메일 형식이 아닙니다.';
    }
    if (!password) {
      errors.password = '필수 입력사항입니다.';
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
    login({ email, password });
  };

  // BE 에러 메시지 추출 (Axios AxiosError -> response.data.message)
  const apiErrorMsg =
    loginError?.response?.data?.message ?? loginError?.message ?? null;

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-black px-4 py-[60px]">
      <form
        className="w-full max-w-[520px]"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* 로고 */}
        <div className="mb-[60px] flex justify-center">
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
            setValue={(v) => {
              setEmail(v);
              // 사용자가 다시 입력하면 submit 에러 클리어
              if (formErrors.email) {
                setFormErrors((prev) => ({ ...prev, email: undefined }));
              }
            }}
            externalError={
              formErrors.email
                ? { isError: true, errMsg: formErrors.email }
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
            setPassword={(v) => {
              setPassword(v);
              if (formErrors.password) {
                setFormErrors((prev) => ({ ...prev, password: undefined }));
              }
            }}
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            externalError={
              formErrors.password
                ? { isError: true, errMsg: formErrors.password }
                : undefined
            }
          />
        </div>

        {/* API 에러 */}
        {apiErrorMsg && <p className="text-red mt-3 text-sm">{apiErrorMsg}</p>}

        {/* 로그인 버튼 */}
        <div className="mt-[50px]">
          <Button btnType="submit" disabled={isPending}>
            {isPending ? '로그인 중...' : '로그인'}
          </Button>
        </div>

        {/* Google 로그인 버튼 */}
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

        {/* 회원가입 링크 */}
        <div className="mt-[40px] flex justify-center gap-[10px] text-[16px] text-white">
          <span className="font-normal">최애의 포토가 처음이신가요?</span>
          <Link href="/register" className="!text-main font-normal !underline">
            회원가입하기
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
