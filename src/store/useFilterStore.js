import { create } from 'zustand';

const useFilterStore = create((set) => ({
  grade: '',
  genre: '',
  isSoldOut: '',

  setFilter: (key, value) => set({ [key]: value }),

  resetFilter: () =>
    set({
      grade: '',
      genre: '',
      isSoldOut: '',
    }),
}));

export default useFilterStore;
