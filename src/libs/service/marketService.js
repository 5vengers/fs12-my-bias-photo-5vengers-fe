import apiClient from '../apiClient';

/**
 * 마켓 목록 조회
 * @param {number} pageParam 페이지 번호
 * @returns {Promise<{items: Array, nextPage: number | undefined}>}
 */
export const getMarketItems = async ({ pageParam = 1 }) => {
  const LIMIT = 6;

  const response = await apiClient.get('/api/market/items', {
    params: {
      page: pageParam,
      limit: LIMIT,
    },
  });

  const data = response.data.data;

  return {
    items: data.items,
    nextPage: data.hasNext ? pageParam + 1 : undefined,
  };
};

<<<<<<< HEAD
export const createMarketItem = async (data) => {
  const res = await apiClient.post('/api/market/items', data);
  return res.data;
=======
// 마켓 아이템 상세 조회
export const getMarketItemDetail = async (itemId) => {
  const response = await apiClient.get(`/api/market/items/${itemId}`);

  return response.data.data;
>>>>>>> eb8f88222c86b1a7896b36adc07c9e9e4e1aa0a0
};
