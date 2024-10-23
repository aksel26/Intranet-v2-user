// combinedStore.ts
import { create } from "zustand";
import { mealStore } from "./mealStore";

interface CombinedStore {
  store1: ReturnType<typeof mealStore>;
  //   store2: ReturnType<typeof useStore2>;
}

export const useCombinedStore = create<CombinedStore>(() => ({
  store1: mealStore.getState(),
  //   store2: useStore2.getState(),
}));

// 각 store의 변경사항을 combinedStore에 반영
mealStore.subscribe((state) => useCombinedStore.setState({ store1: state }));
// useStore2.subscribe((state) => useCombinedStore.setState({ store2: state }));
