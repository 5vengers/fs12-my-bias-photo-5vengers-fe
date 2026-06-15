import { create } from 'zustand';

const useSelectStore = create((set) => ({
  selectChange: '',

  setSelectChange: (change) => set({ selectChange: change }),
}));

export default useSelectStore;
