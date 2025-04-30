import { create } from "zustand";
import { TMyInfo } from "../types/myInfo";

interface IMyInfoState {
  myInfo: TMyInfo | null;
  setMyInfo: (myInfo: TMyInfo) => void;
}

export const myInfoStore = create<IMyInfoState>((set) => ({
  myInfo: null,
  setMyInfo: (myInfo: TMyInfo) => set({ myInfo }),
}));
