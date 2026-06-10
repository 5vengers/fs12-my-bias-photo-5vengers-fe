const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * 로그인
 * POST /api/auth/login
 * @returns {{ user, accessToken }}
 */
export async function login({ email, password }) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // refreshToken 쿠키 수신
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message ?? '로그인에 실패했습니다.');
  }

  return json.data; // { user, accessToken }
}

/**
 * 로그아웃
 * POST /api/auth/logout
 */
export async function logout() {
  await fetch(`${API_URL}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}

/**
 * Access Token 재발급
 * POST /api/auth/refresh
 * @returns {{ accessToken }}
 */
export async function refresh() {
  const res = await fetch(`${API_URL}/api/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message ?? '토큰 재발급에 실패했습니다.');
  }

  return json.data; // { accessToken }
}
