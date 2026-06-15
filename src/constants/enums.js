// enum 은 ts 에만 쓸 수 있으므로 값 변경이 불가능하게 freeze 처리 해두었습니다.

export const Provider = Object.freeze({
  LOCAL: 'LOCAL',
  GOOGLE: 'GOOGLE',
});

export const CardGrade = Object.freeze({
  COMMON: 'COMMON',
  RARE: 'RARE',
  SUPER_RARE: 'SUPER_RARE',
  LEGENDARY: 'LEGENDARY',
});

export const Genre = Object.freeze({
  ALBUM: 'ALBUM',
  BENEFIT: 'BENEFIT',
  FANSIGN: 'FANSIGN',
  SEASON_GREETING: 'SEASON_GREETING',
  FAN_MEETING: 'FAN_MEETING',
  CONCERT: 'CONCERT',
  MD: 'MD',
  COLLAB: 'COLLAB',
  FAN_CLUB: 'FAN_CLUB',
  ETC: 'ETC',
});

export const MarketStatus = Object.freeze({
  SELLING: 'SELLING',
  SOLD_OUT: 'SOLD_OUT',
  DELETED: 'DELETED',
});

export const ExchangeStatus = Object.freeze({
  WAITING: 'WAITING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
});

export const PointLogType = Object.freeze({
  EARN: 'EARN',
  SPEND: 'SPEND',
  BOX: 'BOX',
});

export const PointReferenceType = Object.freeze({
  ORDER: 'ORDER',
  POINT_BOX: 'POINT_BOX',
  SALE: 'SALE',
});

export const NotificationType = Object.freeze({
  TRADE_REQUEST: 'TRADE_REQUEST',
  TRADE_ACCEPTED: 'TRADE_ACCEPTED',
  TRADE_REJECTED: 'TRADE_REJECTED',
  CARD_PURCHASED: 'CARD_PURCHASED',
  CARD_SOLD: 'CARD_SOLD',
  CARD_SOLD_OUT: 'CARD_SOLD_OUT',
});

export const RouteType = Object.freeze({
  MARKET_ITEM: 'MARKET_ITEM',
  EXCHANGE_PROPOSAL: 'EXCHANGE_PROPOSAL',
  MY_GALLERY: 'MY_GALLERY',
  MY_SELL_CARDS: 'MY_SELL_CARDS',
});

export const OperationType = Object.freeze({
  INSERT: 'INSERT',
  UPDATE: 'UPDATE',
  DELETED: 'DELETED',
});
