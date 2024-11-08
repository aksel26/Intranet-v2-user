// combinedStore.ts
import { create } from "zustand";
import { mealStore } from "./mealStore";
import { welfareStore } from "./welfareStore";
import { calendarDateStore } from "./calendarDateStore";
import { toggleStore } from "./toggleStore";
import { activityStore } from "./activityStore";

// import { activityStore } from "./activityStore";

interface CombinedStore {
  mealStore: ReturnType<typeof mealStore>;
  welfareStore: ReturnType<typeof welfareStore>;
  calendarDateStore: ReturnType<typeof calendarDateStore>;
  tooltipToggleStore: ReturnType<typeof toggleStore>;
  activityStore: ReturnType<typeof activityStore>;
}

export const useCombinedStore = create<CombinedStore>(() => ({
  mealStore: mealStore.getState(),
  welfareStore: welfareStore.getState(),
  activityStore: activityStore.getState(),
  calendarDateStore: calendarDateStore.getState(),
  tooltipToggleStore: toggleStore.getState(),
}));

// 각 store의 변경사항을 combinedStore에 반영
mealStore.subscribe((state) => useCombinedStore.setState({ mealStore: state }));
welfareStore.subscribe((state) => useCombinedStore.setState({ welfareStore: state }));
calendarDateStore.subscribe((state) => useCombinedStore.setState({ calendarDateStore: state }));
toggleStore.subscribe((state) => useCombinedStore.setState({ tooltipToggleStore: state }));
activityStore.subscribe((state) => useCombinedStore.setState({ activityStore: state }));
