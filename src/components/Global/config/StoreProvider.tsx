"use client";

import { useCombinedStore } from "@/lib/store/CombinedSotre";
import { useRef } from "react";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<ReturnType<typeof useCombinedStore>>();
  if (!storeRef.current) {
    storeRef.current = useCombinedStore();
  }
  return children;
}
