// store/navStore.ts
import { create } from "zustand";

interface NavState {
  mobileOpened: boolean;
  toggleMobile: () => void;
  setMobileClose: () => void;
  setDesktopOpened: (value: boolean) => void;
}

export const useNavStore = create<NavState>((set) => ({
  mobileOpened: false,
  toggleMobile: () => set((state) => ({ mobileOpened: !state.mobileOpened })),
  setMobileClose: () => set(() => ({ mobileOpened: false })),
  setDesktopOpened: (value: boolean) => set({ mobileOpened: value }),
}));
