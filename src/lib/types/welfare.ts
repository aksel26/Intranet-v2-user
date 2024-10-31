export type TWelfare = {
  id: number;
  date: string;
  welfare: string;
  amount: number;
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
