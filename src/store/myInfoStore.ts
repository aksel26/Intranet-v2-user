import type { TMyInfo } from "@/types/myInfo";
import { create } from "zustand";

interface IMyInfoState {
  myInfo: TMyInfo | null;
  setMyInfo: (myInfo: TMyInfo) => void;
}

export const myInfoStore = create<IMyInfoState>((set) => ({
  myInfo: null,
  setMyInfo: (myInfo: TMyInfo) => set({ myInfo }),
}));
