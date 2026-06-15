// message 가 존재하지 않는다면 default: {title}에 {status}했습니다!

export const RESULT_CONFIG = {
  card: {
    sell: {
      title: '판매 등록',
      success: { link: '/myGallery' },
      fail: { link: '/marketPalce' },
    },
    buy: {
      title: '구매',
      success: { link: '/myGallery' },
      fail: { link: '/marketPalce' },
    },
    exchange: {
      title: '교환 제시',
      success: { link: '/mySales' },
      fail: { link: '/marketPlace' },
    },
    create: {
      title: '포토카드 생성',
      success: { link: '/myGallery' },
      fail: { link: '/myGallery' },
    },
  },
  auth: {
    login: {
      title: '로그인',
      success: { link: '/' },
      fail: { link: '/login' },
    },
    register: {
      title: '회원가입',
      success: { link: '/login' },
      fail: { link: '/register' },
    },
  },
};

export const VALID_STATUS_TYPE = ['success', 'fail'];

export const LINK_NAME = {
  myGallery: '마이갤러리',
  marketPlace: '마켓플레이스',
  mySales: '나의 판매 포토카드',
  login: '로그인',
  register: '회원가입',
};
