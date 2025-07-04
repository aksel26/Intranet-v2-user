// combinedStore.ts
import { create } from "zustand";
// import { mealStore } from "./mealStore";
// import { welfareStore } from "./welfareStore";
// import { calendarDateStore } from "./calendarDateStore";
// import { toggleStore } from "./toggleStore";
// import { activityStore } from "./activityStore";
import { mainDateStore } from "./mainDateStore";
import { mealStore } from "./benefit/meal/mealStore";
import { welfareStore } from "./benefit/welfare/welfareStore";
import { activityStore } from "./benefit/activity/activityStore";
import { calendarDateStore } from "./calendar/calendarDateStore";
// import type { mealStore } from "./benefit/meal/mealStore";
// import type { welfareStore } from "./benefit/welfare/welfareStore";
// import type { activityStore } from "./benefit/activity/activityStore";

// import { activityStore } from "./activityStore";

interface CombinedStore {
  mealStore: ReturnType<typeof mealStore>;
  welfareStore: ReturnType<typeof welfareStore>;
  calendarDateStore: ReturnType<typeof calendarDateStore>;
  // tooltipToggleStore: ReturnType<typeof toggleStore>;
  activityStore: ReturnType<typeof activityStore>;
  mainDateStore: ReturnType<typeof mainDateStore>;
}

export const useCombinedStore = create<CombinedStore>(() => ({
  mealStore: mealStore.getState(),
  welfareStore: welfareStore.getState(),
  activityStore: activityStore.getState(),
  calendarDateStore: calendarDateStore.getState(),
  mainDateStore: mainDateStore.getState(),
  // tooltipToggleStore: toggleStore.getState(),
}));

// 각 store의 변경사항을 combinedStore에 반영
mealStore.subscribe((state) => useCombinedStore.setState({ mealStore: state }));
welfareStore.subscribe((state) => useCombinedStore.setState({ welfareStore: state }));
calendarDateStore.subscribe((state) => useCombinedStore.setState({ calendarDateStore: state }));
// toggleStore.subscribe((state) => useCombinedStore.setState({ tooltipToggleStore: state }));
activityStore.subscribe((state) => useCombinedStore.setState({ activityStore: state }));
mainDateStore.subscribe((state) => useCombinedStore.setState({ mainDateStore: state }));
