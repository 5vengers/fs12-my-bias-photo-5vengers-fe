import { create } from 'zustand';

const useToastStore = create((set) => ({
  toasts: [],

  addToast: (type, msg, contentType = 'toast') => {
    set((state) => {
      const toastLength = state.toasts.filter(
        (t) => t.contentType === contentType,
      ).length;

      if (toastLength >= 5) return state;

      const id = Math.random();
      const newToast = { id, type, msg, contentType };

      setTimeout(
        () =>
          set((s) => ({
            toasts: s.toasts.filter((t) => t.id !== id),
          })),
        3000,
      );

      return { toasts: [...state.toasts, newToast] };
    });
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));

export default useToastStore;
