import { create } from 'zustand';

/*
    zustand 로 카드 정보를 관리합니다.
    cardName: 카드 이름,
    cardGrade: 카드 등급,
    cardGenre: 카드 장르,
    cardCount: 생성, 구매, 교환 될 카드 개수,
*/

const init = { cardName: '', cardGrade: '', cardCount: '' };

const useCardStore = create((set) => ({
  ...init,

  actions: {
    setCardName: (name) => set({ cardName: name }),
    setCardGrade: (grade) => set({ cardGrade: grade }),
    setCardCount: (count) => set({ cardCount: count }),
    reset: () => set(init),
  },
}));

export default useCardStore;
