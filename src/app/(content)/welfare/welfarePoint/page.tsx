"use client";

import { WelfareFetchWrapper } from "@/components/content/welfare/WelfareFetchWrapper";
import { Suspense } from "react";
import Loading from "../loading";
import ScrollToTop from "@/components/Global/scrollToTop";

const WelfareMain = () => {
  return (
    <Suspense fallback={<Loading />}>
      <WelfareFetchWrapper />
      <ScrollToTop />
    </Suspense>
  );
};

export default WelfareMain;
