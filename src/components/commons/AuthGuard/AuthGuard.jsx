'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useIsAuthenticated } from '../../../hooks/useAuth';
import useAuthStore from '../../../store/authStore';

// ─────────────────────────────────────────────
// 공통 로딩 UI
// hydration 또는 refresh 진행 중 표시
// ─────────────────────────────────────────────
const AuthLoading = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="border-t-main h-8 w-8 animate-spin rounded-full border-[3px] border-gray-200" />
  </div>
);

// ─────────────────────────────────────────────
// PrivateGuard: 로그인한 유저만 접근
// 미인증 -> /login 리다이렉트
// ─────────────────────────────────────────────
export const PrivateGuard = ({ children }) => {
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();

  // user O + accessToken X = refresh 진행 중
  // 이 상태에서 isAuthenticated는 false지만 리다이렉트하면 안 됨
  const isRefreshing = !!user && !accessToken;

  useEffect(() => {
    if (hasHydrated && !isRefreshing && !isAuthenticated) {
      router.replace('/login');
    }
  }, [hasHydrated, isRefreshing, isAuthenticated, router]);

  if (!hasHydrated) return <AuthLoading />; // hydration 대기
  if (isRefreshing) return <AuthLoading />; // refresh 대기
  if (!isAuthenticated) return null; // 리다이렉트 진행 중

  return children;
};

// ─────────────────────────────────────────────
// PublicGuard: 비로그인 유저만 접근
// 인증 상태 -> / 리다이렉트
// ─────────────────────────────────────────────
export const PublicGuard = ({ children }) => {
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();

  const isRefreshing = !!user && !accessToken;

  useEffect(() => {
    if (hasHydrated && !isRefreshing && isAuthenticated) {
      router.replace('/');
    }
  }, [hasHydrated, isRefreshing, isAuthenticated, router]);

  if (!hasHydrated) return <AuthLoading />;
  if (isRefreshing) return <AuthLoading />; 
  if (isAuthenticated) return null; 

  return children;
};
