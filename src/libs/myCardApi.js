import useAuthStore from '@/store/useAuthStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const authHeaders = () => {
  const { accessToken } = useAuthStore.getState();
  return accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : {};
};

export const getMyCards = async () => {
  const res = await fetch(`${API_URL}/api/my-cards`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
  });

  if (!res.ok) throw new Error('나의 포토카드 조회에 실패했습니다.');

  const json = await res.json();
  return json.data;
};

export const getMyCardById = async (myCardId) => {
  const res = await fetch(`${API_URL}/api/my-cards/${myCardId}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
  });

  if (!res.ok) throw new Error('포토카드 상세 조회에 실패했습니다.');

  const json = await res.json();
  return json.data;
};
