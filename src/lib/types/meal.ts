export type TMealsParams = {
  year: number;
  month: number;
};

export type TMeal = {
  id: number;
  date: string;
  meal: string;
  amount: number;
  userName: string;
};

export type TMealStats = {
  year: string;
  month: string;
  mealBudget: string | number | undefined;
  mealExpense: string | number | undefined;
  mealBalance: string | number | undefined;
  userName: string;
};

export type TMealInfo = {
  mealStats: TMealStats;
  meals: TMeal[];
};
