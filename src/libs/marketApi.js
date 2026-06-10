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
 * 마켓 전체 아이템 조회
 * GET /api/market/items
 */
export async function getMarketItems() {
  const res = await fetch(`${API_URL}/api/market/items`, {
    credentials: 'include',
  });

  if (!res.ok) throw new Error('판매 목록 조회에 실패했습니다.');

  const { data } = await res.json();
  return data;
}

/**
 * 마켓 아이템 상세 조회
 * GET /api/market/items/:itemId
 */
export async function getMarketItemDetail(itemId) {
  const res = await fetch(`${API_URL}/api/market/items/${itemId}`, {
    credentials: 'include',
    headers: { ...authHeaders() },
  });

  if (!res.ok) throw new Error('판매 카드 상세 조회에 실패했습니다.');

  const { data } = await res.json();
  return data;
}

/**
 * 나의 판매 카드 목록 조회
 * 전체 조회 후 sellerId === userId 로 필터링
 * @param {string} userId - 현재 로그인한 유저 ID
 */
export async function getMyMarketItems(userId) {
  const all = await getMarketItems();
  return all.filter(
    (item) => item.sellerId === userId && item.status !== 'DELETED',
  );
}
