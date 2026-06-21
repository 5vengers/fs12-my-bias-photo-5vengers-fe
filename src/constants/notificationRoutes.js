/**
 * BE routeType -> FE 페이지 경로 매핑
 *
 * 실제 라우트: src/app/(main)/(private)/market/[itemId]
 * - EXCHANGE_PROPOSAL : 교환 제안 알림 -> 마켓 아이템 상세 페이지
 *                       (해당 페이지 안에 교환 제안 정보가 포함되어 있음)
 * - MARKET_ITEM       : 마켓 아이템 상세 페이지 (targetId = marketItemId)
 * - MY_SELL_CARDS     : 내 판매 목록 페이지
 */
const ROUTE_MAP = {
  EXCHANGE_PROPOSAL: (targetId) => `/market/${targetId}`,
  MARKET_ITEM: (targetId) => `/market/${targetId}`,
  MY_SELL_CARDS: '/myGallery/mySales',
};

/**
 * routeType과 targetId로 이동할 경로 반환
 * @param {string} routeType
 * @param {number | null} targetId
 * @returns {string}
 */
export const getNotificationRoute = (routeType, targetId) => {
  const route = ROUTE_MAP[routeType];
  if (!route) return '/market';
  if (
    typeof route === 'function' &&
    (targetId === null || targetId === undefined)
  )
    return '/market';
  return typeof route === 'function' ? route(targetId) : route;
};
