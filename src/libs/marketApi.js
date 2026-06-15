const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMarketItems = async () => {
  const res = await fetch(`${API_URL}/api/market/items`, {
    credentials: 'include',
  });

  if (!res.ok) throw new Error('판매 목록 조회에 실패했습니다.');

  const { data } = await res.json();
  return data;
};

export const getMarketItemDetail = async (itemId) => {
  const res = await fetch(`${API_URL}/api/market/items/${itemId}`, {
    credentials: 'include',
  });

  if (!res.ok) throw new Error('판매 카드 상세 조회에 실패했습니다.');

  const { data } = await res.json();
  return data;
};

export const getMyMarketItems = async (userId) => {
  const all = await getMarketItems();
  return all.filter(
    (item) => item.sellerId === userId && item.status !== 'DELETED',
  );
};
