// store/navStore.ts
import { create } from "zustand";

interface NavState {
  mobileOpened: boolean;
  toggleMobile: () => void;
  setDesktopOpened: (value: boolean) => void;
}

export const useNavStore = create<NavState>((set) => ({
  mobileOpened: false,
  toggleMobile: () => set((state) => ({ mobileOpened: !state.mobileOpened })),
  setDesktopOpened: (value: boolean) => set({ mobileOpened: value }),
}));
