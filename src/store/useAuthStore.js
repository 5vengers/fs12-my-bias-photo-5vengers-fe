import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  point: 0,
  isLoggedIn: false,

  login: (userData, accessToken) =>
    set({
      user: userData,
      accessToken,
      point: userData.point ?? 0,
      isLoggedIn: true,
    }),

  logout: () =>
    set({
      user: null,
      accessToken: null,
      point: 0,
      isLoggedIn: false,
    }),

  updatePoint: (newPoint) => set({ point: newPoint }),

  setAccessToken: (token) => set({ accessToken: token }),
}));

export default useAuthStore;
