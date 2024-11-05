// combinedStore.ts
import { create } from "zustand";
import { mealStore } from "./mealStore";
import { welfareStore } from "./welfareStore";
import { calendarDateStore } from "./calendarDateStore";
// import { activityStore } from "./activityStore";

interface CombinedStore {
  mealStore: ReturnType<typeof mealStore>;
  welfareStore: ReturnType<typeof welfareStore>;
  calendarDateStore: ReturnType<typeof calendarDateStore>;
  // activityStore: ReturnType<typeof activityStore>;
}

export const useCombinedStore = create<CombinedStore>(() => ({
  mealStore: mealStore.getState(),
  welfareStore: welfareStore.getState(),
  // activityStore: activityStore.getState(),
  calendarDateStore: calendarDateStore.getState(),
}));

// 각 store의 변경사항을 combinedStore에 반영
mealStore.subscribe((state) => useCombinedStore.setState({ mealStore: state }));
welfareStore.subscribe((state) => useCombinedStore.setState({ welfareStore: state }));
calendarDateStore.subscribe((state) => useCombinedStore.setState({ calendarDateStore: state }));
// activityStore.subscribe((state) => useCombinedStore.setState({ activityStore: state }));
