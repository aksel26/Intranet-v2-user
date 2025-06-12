"use client";

import { MealFetchWrapper } from "@/components/content/meal/MealFetchWrapper";
import { Suspense } from "react";
import Loading from "../loading";

const Main = () => {
  return (
    <Suspense fallback={<Loading />}>
      <MealFetchWrapper />
    </Suspense>
  );
};

export default Main;
