import { create } from 'zustand';

/*
    zustand 로 깜짝 모달 상태를 관리합니다.

    isOpen = 모달 닫힘, 열림 상태
    canGetPoint = 현재 포인트를 얻을 수 있는 상태인지 아닌지
*/

export const useSurpriseModalStore = create((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),

  canGetPoint: false,
  setCanGetPoint: (b) => set({ canGetPoint: b }),
}));
