import { create } from "zustand";

interface ToggleStateStore {
  toggleInfo: {
    isOpen: boolean;
  };
  setToggleInfo: (isOpen: boolean) => void; // boolean 파라미터 추가
}

export const toggleStore = create<ToggleStateStore>((set) => ({
  toggleInfo: {
    isOpen: false,
  },
  setToggleInfo: (isOpen: boolean) =>
    set({
      toggleInfo: {
        isOpen: isOpen,
      },
    }),
}));
