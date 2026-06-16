'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Toast from '@/components/commons/Toast/Toast';
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
const GOOGLE_AUTH_URL = `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'}/api/auth/google`;

// useSearchParams는 Suspense 경계 안에서만 사용 가능
const OAuthErrorMessage = () => {
  const searchParams = useSearchParams();
  const oauthError = searchParams.get('error');

  return (
    <>
      {oauthError === 'email_conflict' && (
        <p className="mt-3 text-sm text-yellow-400">
          이미 해당 이메일로 가입된 계정이 있습니다. 이메일로 로그인해 주세요.
        </p>
      )}
      {oauthError === 'oauth' && (
        <p className="mt-3 text-sm text-red-400">
          구글 로그인에 실패했거나 취소되었습니다.
        </p>
      )}
    </>
  );
};

const RegisterSuccessToast = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const registered = searchParams.get('registered');

    if (registered === 'true') {
      setShowToast(true);

      router.replace('/login', {
        scroll: false,
      });

      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [searchParams, router]);

  if (!showToast) return null;

  return (
    <Toast toastType="success" onClose={() => setShowToast(false)}>
      회원가입이 완료되었습니다!
    </Toast>
  );
};

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // submit 시 빈 필드·형식 오류를 Input에 내려줄 에러 상태
  const [formErrors, setFormErrors] = useState({});

  const { mutate: login, isPending, error: loginError, reset } = useLogin();

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
    } else if (password.length < 8) {
      errors.password = '비밀번호는 8자 이상이어야 합니다.';
    } else if (password.length > 20) {
      errors.password = '비밀번호는 20자 이하이어야 합니다.';
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
              if (loginError) reset(); // loginError 초기화
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
              if (loginError) reset();
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

        {/* API 에러 — formErrors 없을 때만 표시 */}
        {apiErrorMsg && <p className="text-red mt-3 text-sm">{apiErrorMsg}</p>}

        <Suspense fallback={null}>
          <RegisterSuccessToast />
        </Suspense>

        {/* OAuth 에러 메시지 */}
        <Suspense fallback={null}>
          <OAuthErrorMessage />
        </Suspense>

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
