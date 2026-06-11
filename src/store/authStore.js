import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * 인증 상태 전역 관리 (Zustand + persist)
 *
 * 보안 전략:
 * - user: localStorage에 저장 -> 새로고침 후 사용자 정보 유지
 * - accessToken: 메모리에만 유지 -> 새로고침 시 초기화 (XSS 방어)
 * - refreshToken: httpOnly 쿠키 -> 브라우저가 자동 관리 (JS 접근 불가)
 *
 * 새로고침 시 인증 복원 흐름:
 * user(localStorage) O -> /api/auth/refresh 호출 -> accessToken 갱신 -> 인증 완료
 * user(localStorage) X 또는 refresh 실패 -> 비로그인 상태
 *
 * hasHydrated -> onRehydrateStorage 콜백으로 hydration 완료 시점 추적
 * useInitAuth의 enabled 조건에서 안전하게 사용 가능
 */
const useAuthStore = create(
  // 새로고침해도 상태 유지
  persist(
    (set) => ({
      user: null,
      accessToken: null, // 메모리 전용 (persist 대상 제외)
      hasHydrated: false, // localStorage 데이터를 읽어왔는지 여부

      // 로그인 성공 시 user + accessToken 일괄 설정
      setAuth: (user, accessToken) => set({ user, accessToken }),

      // 토큰 재발급 시 accessToken만 갱신
      setAccessToken: (accessToken) => set({ accessToken }),

      // 로그아웃 또는 인증 만료 시 전체 초기화
      clearAuth: () => set({ user: null, accessToken: null }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'auth-storage', // localStorage 키 이름
      // user만 localStorage에 저장, accessToken, hasHydrated는 메모리 전용
      partialize: (state) => ({ user: state.user }),
      // localStorage 복원 끝난 직후 실행되는 콜백
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('[authStore] hydration 실패:', error);
        }
        // 실패해도 true로 설정 -> false로 묶이면 useInitAuth enabled 조건 영원히 불충족
        state?.setHasHydrated(true);
      },
    },
  ),
);

export default useAuthStore;
