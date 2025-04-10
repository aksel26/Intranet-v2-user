import { create } from "zustand";
import { TMyInfo } from "../types/myInfo";

interface IMyInfoState {
  myInfo: TMyInfo;
  setMyInfo: (myInfo: TMyInfo) => void;
}

export const myInfoStore = create<IMyInfoState>((set) => ({
  myInfo: {
    userIdx: null,
    userName: null,
    userGender: null,
    userCell: null,
    userEmail: null,
    userBirth: null,
    userAddress: null,
    joinDate: null,
    hqName: null,
    teamName: null,
    gradeName: null,
    adminRole: null,
    checkInTime: null,
    attendance: null,
    leaveTypeIdx: null,
  },
  setMyInfo: (myInfo: TMyInfo) => set({ myInfo }),
}));
