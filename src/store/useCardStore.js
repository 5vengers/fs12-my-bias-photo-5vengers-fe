import { create } from 'zustand';

/*
    zustand 로 카드 정보를 관리합니다.
    cardName: 카드 이름,
    cardGrade: 카드 등급,
    cardGenre: 카드 장르,
    cardCount: 생성, 구매, 교환 될 카드 개수,
*/

const useCardStore = create((set) => ({
  cardName: '',
  cardGrade: '',
  cardGenre: '',
  cardCount: '',

  setCardName: (name) => set({ cardName: name }),
  setCardGrade: (grade) => set({ cardGrade: grade }),
  setCardGenre: (genre) => set({ cardGrade: genre }),
  setCardCount: (count) => set({ cardCount: count }),
}));

export default useCardStore;
