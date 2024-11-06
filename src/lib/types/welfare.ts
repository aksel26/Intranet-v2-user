export type TWelfare = {
  welfareIdx: number;
  userIdx: number;
  targetDay: string;
  content: string;
  amount: number | null;
  payerName: string | null;
  selfWrittenYN: string;
  payeeList: TPayeeList[];
};

export type TPayeeList = {
  userIdx: number;
  userName: string;
};

export type TWelfareStats = {
  year: string;
  welfareBudget: string | number | undefined;
  welfareExpense: string | number | undefined;
  welfareBalance: string | number | undefined;
  userName: string;
};

export type TWelfareInfo = {
  welfareStats: TWelfareStats;
  welfares: TWelfare[];
};

export interface TWelfareList {
  welfareIdx: number;
  userIdx: number;
  targetDay: string;
  content: string;
  amount: number;
  payerName: string;
  selfWrittenYN: string;
  payeeList: number;
  isApproved: boolean; //number;
}
