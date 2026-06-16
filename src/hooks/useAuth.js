import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import authService from '../libs/authService';
import { executeRefresh } from '../libs/apiClient';
import useAuthStore from '../store/authStore';

// ─────────────────────────────────────────────
// Query Keys
// ─────────────────────────────────────────────
export const AUTH_QUERY_KEYS = {
  INIT: ['auth', 'init'],
};

// ─────────────────────────────────────────────
// useRegister: 회원가입
// ─────────────────────────────────────────────
/**
 * @example
 * const { mutate: register, isPending, error } = useRegister();
 * register({ email, password, nickname });
 */
export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      router.replace('/login?registered=true');
    },
  });
};

// ─────────────────────────────────────────────
// useLogin: 로그인
// ─────────────────────────────────────────────
/**
 * @example
 * const { mutate: login, isPending, error } = useLogin();
 * login({ email, password });
 */
export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  return useMutation({
    mutationFn: async (data) => {
      const response = await authService.login(data);
      const { user, accessToken } = response.data;

      if (!user || !accessToken) {
        throw new Error('로그인 응답이 올바르지 않습니다.');
      }

      return { user, accessToken };
    },
    onSuccess: ({ user, accessToken }) => {
      setAuth(user, accessToken);
      useAuthStore.getState().setShowLoggedInToast(true);
      router.replace('/');
    },
  });
};

// ─────────────────────────────────────────────
// useLogout: 로그아웃
// ─────────────────────────────────────────────
/**
 * API 실패 여부와 무관하게 클라이언트 인증 상태는 항상 초기화
 *
 * @example
 * const { mutate: logout, isPending } = useLogout();
 * logout();
 */
export const useLogout = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = () => {
    clearAuth();
    queryClient.clear(); // 캐시된 모든 쿼리 초기화
    router.replace('/login?loggedOut=true');
  };

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: handleLogout,
    onError: handleLogout, // 서버 에러가 발생해도 클라이언트 상태는 초기화
  });
};

// ─────────────────────────────────────────────
// useInitAuth: 앱 초기 로드 시 인증 상태 복원
// ─────────────────────────────────────────────
/**
 * executeRefresh() 사용 -> interceptor와 동일한 Promise 공유
 * 앱 시작 시 다른 API와 동시에 호출되어도 refresh는 1번만 발생
 * hydration 완료 전 user === null로 오판하는 케이스 방지
 */
export const useInitAuth = () => {
  const user = useAuthStore((state) => state.user);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  return useQuery({
    queryKey: AUTH_QUERY_KEYS.INIT,
    queryFn: executeRefresh,
    enabled: hasHydrated && !!user, // localStorage 읽고 로그인 기록 있을 때 실행
    retry: false,
    staleTime: Infinity, // 앱 시작 시 1번
  });
};

// ─────────────────────────────────────────────
// useIsAuthenticated: 인증 여부 계산
// ─────────────────────────────────────────────
/**
 * !!user && !!accessToken -> 중간 상태 불가능
 */

export const useIsAuthenticated = () => {
  return useAuthStore((state) => !!state.user && !!state.accessToken);
};
