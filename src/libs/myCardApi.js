import useAuthStore from '@/store/useAuthStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/** 인증 헤더 생성 헬퍼 */
function authHeaders() {
  const { accessToken } = useAuthStore.getState();
  return accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : {};
}

/**
 * 나의 포토카드 전체 조회
 * GET /api/my-cards
 */
export async function getMyCards() {
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
}

/**
 * 나의 포토카드 단건 조회
 * GET /api/my-cards/:myCardId
 */
export async function getMyCardById(myCardId) {
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
}
