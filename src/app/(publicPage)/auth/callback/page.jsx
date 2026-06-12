'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { executeRefresh } from '@/libs/apiClient';

const OAuthCallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    executeRefresh()
      .then(() => {
        router.replace('/');
      })
      .catch(() => {
        router.replace('/login');
      });
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-black text-white">
      로그인 처리 중...
    </div>
  );
};

export default OAuthCallbackPage;