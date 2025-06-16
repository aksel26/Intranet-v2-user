"use client";

import { ActivityFetchWrapper } from "@/components/content/activity/ActivityFetchWrapper";
import { Suspense } from "react";
import Loading from "../loading";
import ScrollToTop from "@/components/Global/scrollToTop";

const ActivityMain = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ActivityFetchWrapper />
      <ScrollToTop />
    </Suspense>
  );
};

export default ActivityMain;
