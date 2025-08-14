import { create } from "zustand";
export const useThemeStore = create((set) => ({
  theme: "light",
  changeTheme: (choose) => {
    set({ theme: choose });
  },
}));
