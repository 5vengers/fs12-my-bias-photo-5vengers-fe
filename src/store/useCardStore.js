import { create } from 'zustand';

const useCardStore = create((set) => ({
  cardName: '',
  cardGrade: '',
  cardGenre: '',

  setCardName: (name) => set({ cardName: name }),
  setCardGrade: (grade) => set({ cardGrade: grade }),
  setCardCount: (count) => set({ cardCount: count }),
}));

export default useCardStore;
