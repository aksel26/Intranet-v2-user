export type TMealsParams = {
  year: number;
  month: number;
};
export type TWelfaresParams = {
  year: number;
  month: number;
};

export type TMeal = {
  start: string;
  holidayYN: string;
  breakfast: {
    payerName: null;
    place: null;
    amount: null;
  };
  lunch: {
    payerName: string;
    place: string;
    amount: number;
    attendance: string;
  };
  dinner: {
    payerName: null;
    place: null;
    amount: null;
  };
};

export type TMealStats = {
  year: string;
  month: string;
  mealBudget: string | number | undefined;
  mealExpense: string | number | undefined;
  mealBalance: string | number | undefined;
  userName: string;
};
// export type TMealCurrentDataDetail = {
//   start: string;
//   holidayYN: string;
//   breakfast: {
//     payerName: null;
//     place: null;
//     amount: null;
//   };
//   lunch: {
//     payerName: string;
//     place: string;
//     amount: number;
//     attendance: string;
//   };
//   dinner: {
//     payerName: null;
//     place: null;
//     amount: null;
//   };
// };

export type TMealInfo = {
  mealStats: TMealStats;
  meals: TMeal[];
};

// export type TCurrentMealData = {
//   currentMealData: TMealCurrentDataDetail;
// };
