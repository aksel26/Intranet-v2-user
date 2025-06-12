"use client";

import { ActivityFetchWrapper } from "@/components/content/activity/ActivityFetchWrapper";
import { Suspense } from "react";
import Loading from "../loading";

const ActivityMain = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ActivityFetchWrapper />
    </Suspense>
  );
};

export default ActivityMain;
