"use client";

import { WelfareFetchWrapper } from "@/components/content/welfare/WelfareFetchWrapper";
import { Suspense } from "react";
import Loading from "../loading";

const WelfareMain = () => {
  return (
    <Suspense fallback={<Loading />}>
      <WelfareFetchWrapper />
    </Suspense>
  );
};

export default WelfareMain;
