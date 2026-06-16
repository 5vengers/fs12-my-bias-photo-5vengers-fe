import apiClient from './apiClient';

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
