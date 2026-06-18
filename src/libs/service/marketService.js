import apiClient from '../apiClient';

/**
 * 마켓 목록 조회 (필터 + 정렬 + 검색 + 페이지네이션)
 *
 * @param {Object} params
 * @param {number} params.pageParam 페이지 번호 (기본 1)
 * @param {string} params.grade 등급 필터
 * @param {string} params.genre 장르 필터
 * @param {string} params.soldOut 판매 상태 필터
 * @param {string} params.sort 정렬 기준 (latest, priceAsc 등)
 * @param {string} params.keyword 검색어
 *
 * @returns {Promise<{items: Array, nextPage: number | undefined}>}
 */
export const getMarketItems = async ({
  pageParam = 1,
  grade,
  genre,
  soldOut,
  sort,
  keyword,
}) => {
  const LIMIT = 6;

  const response = await apiClient.get('/api/market/items', {
    params: {
      page: pageParam,
      limit: LIMIT,
      ...(grade && { grade }),
      ...(genre && { genre }),
      ...(soldOut && { soldOut }),
      ...(sort && { sort }),
      ...(keyword && { keyword }),
    },
  });
  const data = response.data.data;
  console.log('데이터->', data);
  return {
    items: data.items,
    nextPage: data.hasNext ? pageParam + 1 : undefined,
  };
};

export const createMarketItem = async (data) => {
  const res = await apiClient.post('/api/market/items', data);
  return res.data;
};

// 마켓 아이템 상세 조회
export const getMarketItemDetail = async (itemId) => {
  const response = await apiClient.get(`/api/market/items/${itemId}`);

  return response.data.data;
};

// 마켓 아이템 구매
export const purchaseMarketItem = async ({ itemId, quantity }) => {
  const response = await apiClient.post(
    `/api/market/items/${itemId}/purchase`,
    {
      quantity,
    },
  );

  return response.data.data;
};

// 마켓 아이템 교환 제안 생성
export const createExchangeProposal = async ({ itemId, offeredCardId }) => {
  const response = await apiClient.post(
    `/api/market/items/${itemId}/exchanges`,
    {
      offeredCardId,
    },
  );

  return response.data.data;
};
