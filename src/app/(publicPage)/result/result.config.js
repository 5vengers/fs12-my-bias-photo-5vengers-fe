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
