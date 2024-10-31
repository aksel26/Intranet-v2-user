// combinedStore.ts
import { create } from "zustand";
import { mealStore } from "./mealStore";
import { welfareStore } from "./welfareStore";
import { activityStore } from "./actiivityStore";

interface CombinedStore {
  store1: ReturnType<typeof mealStore>;
  welfareStore: ReturnType<typeof welfareStore>;
  activityStore: ReturnType<typeof activityStore>;
  //   store2: ReturnType<typeof useStore2>;
}

export const useCombinedStore = create<CombinedStore>(() => ({
  store1: mealStore.getState(),
  welfareStore: welfareStore.getState(),
  activityStore: activityStore.getState(),
  //   store2: useStore2.getState(),
}));

// 각 store의 변경사항을 combinedStore에 반영
mealStore.subscribe((state) => useCombinedStore.setState({ store1: state }));
welfareStore.subscribe((state) => useCombinedStore.setState({ welfareStore: state }));
activityStore.subscribe((state) => useCombinedStore.setState({ activityStore: state }));
// useStore2.subscribe((state) => useCombinedStore.setState({ store2: state }));
