'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { executeRefresh } from '@/libs/apiClient';
import useAuthStore from '@/store/authStore';

const OAuthCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');

    // OAuthError: 구글 로그인 취소 또는 실패
    if (error === 'OAUTH_ERROR') {
        router.replace('/login?error=oauth');
        return;
      }

    // OAuthConflictError: 동일 이메일 LOCAL 계정 존재
    if (error === 'OAUTH_CONFLICT') {
      router.replace('/login?error=email_conflict');
      return;
    }

    executeRefresh()
      .then(() => {
        useAuthStore.getState().setShowLoggedInToast(true);
        router.replace('/');
      })
      .catch((err) => {
        console.error('[OAuth Callback] executeRefresh 실패:', err);
        router.replace('/login?error=oauth');
      });
  }, [router, searchParams]);

  return (
    <div className="flex h-screen items-center justify-center bg-black text-white">
      로그인 처리 중...
    </div>
  );
};

export default OAuthCallbackPage;
