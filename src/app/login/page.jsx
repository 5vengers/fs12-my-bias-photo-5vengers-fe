'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { login as loginApi } from '@/libs/authApi';
import useAuthStore from '@/store/useAuthStore';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      const { user, accessToken } = await loginApi({ email, password });
      login(user, accessToken);
      router.push('/mySales');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ background: '#0F0F0F' }}
    >
      <div
        style={{
          width: '480px',
          background: '#111',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '48px',
        }}
      >
        {/* 로고 */}
        <div className="mb-10 text-center">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="최애의포토"
              width={140}
              height={25}
              style={{ display: 'inline-block' }}
            />
          </Link>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* 이메일 */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                background: '#1A1A1A',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px',
                color: 'white',
                outline: 'none',
                transition: 'border-color 0.15s',
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = 'rgba(239,255,4,0.6)')
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')
              }
            />
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                background: '#1A1A1A',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px',
                color: 'white',
                outline: 'none',
                transition: 'border-color 0.15s',
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = 'rgba(239,255,4,0.6)')
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')
              }
            />
          </div>

          {/* 에러 메시지 */}
          {error && (
            <p style={{ color: '#f87171', fontSize: '13px', margin: '0' }}>
              {error}
            </p>
          )}

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              marginTop: '8px',
              background: isLoading ? 'rgba(239,255,4,0.5)' : '#EFFF04',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              padding: '14px',
              fontSize: '15px',
              fontWeight: '700',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!isLoading) e.currentTarget.style.opacity = '0.85';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        {/* 회원가입 링크 */}
        <p
          className="mt-6 text-center text-sm"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          아직 계정이 없으신가요?{' '}
          <Link
            href="/register"
            style={{
              color: '#EFFF04',
              fontWeight: '600',
              textDecoration: 'none',
            }}
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
