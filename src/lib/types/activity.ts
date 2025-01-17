export type TActivity = {
  id: number;
  date: string;
  activity: string;
  amount: number;
  userName: string;
};

export type TActivityStats = {
  year: string;
  activityBudget: string | number | undefined;
  activityExpense: string | number | undefined;
  activityBalance: string | number | undefined;
  // hqName: string;
  month: string;
  userName: string;
};

export type TActivityInfo = {
  activityStats: TActivityStats;
  activities: TActivity[];
};

export interface TactivityList {
  activityIdx: number;
  userIdx: number;
  targetDay: string;
  content: string;
  amount: number;
  payerName: string;
  selfWrittenYN: string;
  payeeList: number;
  isApproved: boolean; //number;
}
