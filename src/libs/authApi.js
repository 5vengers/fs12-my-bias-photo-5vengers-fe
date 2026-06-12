const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async ({ email, password }) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message ?? '로그인에 실패했습니다.');
  }

  return json.data;
};

export const logout = async () => {
  await fetch(`${API_URL}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
};

export const refresh = async () => {
  const res = await fetch(`${API_URL}/api/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message ?? '토큰 재발급에 실패했습니다.');
  }

  return json.data;
};
