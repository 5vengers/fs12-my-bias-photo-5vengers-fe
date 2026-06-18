/**
 * Axios Client
 *
 * 인증 처리 전략:
 * - 모든 요청에 accessToken 자동 주입
 * - accessToken 만료(EXPIRED_TOKEN) 시 자동 재인증
 * - refreshToken(httpOnly Cookie)으로 accessToken 재발급
 * - 재발급 성공 시 원본 요청 자동 재시도
 * - refreshPromise 공유를 통해 중복 refresh 요청 방지
 */

import axios from 'axios';
import useAuthStore from '../store/authStore';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // httpOnly 쿠키(refreshToken) 자동 전송
});

const refreshClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

/**
 * refresh는 authService에서 제거
 * executeRefresh: refresh의 유일한 진입점
 * refreshPromise를 공유하여 중복 호출 방지
 * useInitAuth, axios interceptor 재인증 모두 이 함수 사용
 * 진행 중인 refresh가 있으면 기존 Promise 재사용 -> 실제 API 호출은 1번만
 */
let refreshPromise = null; // 토큰 재발급 진행 상태

export const executeRefresh = () => {
  if (!refreshPromise) {
    refreshPromise = refreshClient
      .post('/api/auth/refresh')
      .then((res) => {
        const accessToken = res.data?.data?.accessToken;

        if (!accessToken)
          throw new Error('토큰 재발급 응답이 올바르지 않습니다.');

        const user = useAuthStore.getState().user;
        useAuthStore.getState().setAuth(user, accessToken);

        return { accessToken, user };
      })
      .catch((err) => {
        console.error('[executeRefresh] 토큰 재발급 실패:', err);
        useAuthStore.getState().clearAuth();
        throw err;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

// ─────────────────────────────────────────────
// Request 인터셉터: accessToken 헤더 자동 주입
// ─────────────────────────────────────────────
apiClient.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// ─────────────────────────────────────────────
// Response 인터셉터: EXPIRED_TOKEN → executeRefresh -> 원본 요청 재시도
//
// executeRefresh가 refreshPromise를 공유하므로
// 동시 401이 여러 개 와도 refresh 요청은 1번만 발생
// ─────────────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const errorCode = error.response?.data?.code;

    // INVALID_TOKEN은 재시도 없이 바로 로그아웃
    if (errorCode === 'INVALID_TOKEN') {
      useAuthStore.getState().clearAuth();
      return Promise.reject(error);
    }

    if (errorCode === 'EXPIRED_TOKEN' && !originalRequest._retry) {
      originalRequest._retry = true; // 재시도 1번만

      try {
        const { accessToken } = await executeRefresh();
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest); // 재요청
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
