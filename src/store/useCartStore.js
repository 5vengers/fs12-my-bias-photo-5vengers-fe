import { create } from 'zustand';

const useCartStore = create((set) => ({
  selectedCard: null,
  quantity: 1,

  setSelectedCard: (card) => set({ selectedCard: card, quantity: 1 }),

  setQuantity: (quantity) => set({ quantity }),

  clearCart: () => set({ selectedCard: null, quantity: 1 }),
}));

export default useCartStore;
