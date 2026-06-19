import apiClient from './apiClient';

/**
 * refresh는 authService에서 제거
 * -> executeRefresh() 가 유일한 진입점 (apiClient.js에서 export)
 * -> authService.refresh()를 직접 호출하면 refreshPromise 공유 로직을 우회하게 되므로 제공하지 않음
 */

/**
 * POST /api/auth/register
 * @param {{ email: string, password: string, nickname: string }} data
 * @returns {{ success: boolean, message: string, data: { id, email, nickname, provider, created_at } }}
 */
const register = async (data) => {
  const response = await apiClient.post('/api/auth/register', data);
  return response.data;
};

/**
 * POST /api/auth/login
 * @param {{ email: string, password: string }} data
 * @returns {{ success: boolean, message: string, data: { user, accessToken } }}
 * 서버에서 httpOnly 쿠키로 refreshToken 자동 설정
 */
const login = async (data) => {
  const response = await apiClient.post('/api/auth/login', data);
  return response.data;
};

/**
 * POST /api/auth/logout
 * 서버에서 httpOnly 쿠키의 refreshToken을 삭제 처리
 * @returns {{ success: boolean, message: string }}
 */
const logout = async () => {
  const response = await apiClient.post('/api/auth/logout');
  return response.data;
};

const authService = { register, login, logout };

export default authService;