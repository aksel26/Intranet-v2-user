import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface mealInfoState {
  // bears: 0,
  // increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 })
}

// export const useAppStore = create<any>((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state: any) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
// }));

// // const useStore = create(devtools(useAppStore));

// export default useAppStore;

const store = (set: any) => ({
  bears: 0,
  increasePopulation: () => set((state: any) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
});

const useAppStore = create(devtools(store));

export default useAppStore;
