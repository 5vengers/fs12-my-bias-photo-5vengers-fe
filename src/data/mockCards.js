export const MOCK_MARKET_ITEMS = [
  {
    id: 1,
    sellerId: 'uuid-1', // 실제 사용 시에는 사용자 UUID
    myCardId: 101,
    grade: 'COMMON',
    genre: 'ALBUM',
    quantity: 1,
    soldQuantity: 0,
    pricePerCard: 5000,
    status: 'SELLING',
    myCard: {
      photoCard: {
        id: 1,
        name: '뉴진스 하니 포토카드',
        imageUrl: '/images/card1.png', // public 폴더에 이미지 준비
      },
    },
  },
  {
    id: 2,
    sellerId: 'uuid-2',
    myCardId: 102,
    grade: 'LEGENDARY',
    genre: 'CONCERT',
    quantity: 1,
    soldQuantity: 0,
    pricePerCard: 150000,
    status: 'SELLING',
    myCard: {
      photoCard: {
        id: 2,
        name: '아이브 원영 홀로그램',
        imageUrl: '/images/card2.png',
      },
    },
  },
  {
    id: 3,
    sellerId: 'uuid-3',
    myCardId: 103,
    grade: 'RARE',
    genre: 'FANSIGN',
    quantity: 5,
    soldQuantity: 1,
    pricePerCard: 25000,
    status: 'SELLING',
    myCard: {
      photoCard: {
        id: 3,
        name: '에스파 카리나 특전',
        imageUrl: '/images/card3.png',
      },
    },
  },
];

export const MOCK_MY_CARDS = [
  {
    id: 101,
    ownerId: 'user-1',
    photoCardId: 1,
    quantity: 3,
    photoCard: {
      id: 1,
      name: '뉴진스 하니 포토카드',
      imageUrl: '/testCard.jpg',
      grade: 'COMMON',
      genre: 'ALBUM',
    },
  },
  {
    id: 102,
    ownerId: 'user-1',
    photoCardId: 2,
    quantity: 1,
    photoCard: {
      id: 2,
      name: '아이브 원영 홀로그램',
      imageUrl: '/testCard.jpg',
      grade: 'LEGENDARY',
      genre: 'CONCERT',
    },
  },
  {
    id: 103,
    ownerId: 'user-1',
    photoCardId: 3,
    quantity: 5,
    photoCard: {
      id: 3,
      name: '에스파 카리나 특전',
      imageUrl: '/testCard.jpg',
      grade: 'RARE',
      genre: 'FANSIGN',
    },
  },
  {
    id: 104,
    ownerId: 'user-1',
    photoCardId: 4,
    quantity: 2,
    photoCard: {
      id: 4,
      name: '라이즈 앤톤 시즌그리팅',
      imageUrl: '/testCard.jpg',
      grade: 'SUPER_RARE',
      genre: 'SEASON_GREETING',
    },
  },
  {
    id: 105,
    ownerId: 'user-1',
    photoCardId: 5,
    quantity: 10,
    photoCard: {
      id: 5,
      name: '세븐틴 민규 팬미팅',
      imageUrl: '/testCard.jpg',
      grade: 'COMMON',
      genre: 'FAN_MEETING',
    },
  },
  {
    id: 106,
    ownerId: 'user-1',
    photoCardId: 6,
    quantity: 1,
    photoCard: {
      id: 6,
      name: '블랙핑크 지수 콜라보',
      imageUrl: '/testCard.jpg',
      grade: 'RARE',
      genre: 'COLLAB',
    },
  },
];
