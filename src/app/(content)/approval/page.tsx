"use client";
import ApprovalList from "@/components/Approval/list";
import SearchApprovals from "@/components/Approval/search";
import PageContainer from "@/components/Global/container";
import { TApproval } from "@/types/apiTypes";
import { Paper, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import { Suspense, useState } from "react";
import Loading from "./loading";

const page = () => {
  const [params, setParams] = useState<TApproval>({
    year: dayjs().year().toString(),
  });

  return (
    <>
      <SearchApprovals setParams={setParams} />
      <Paper bg={"white"} px="md" py="md" radius={"lg"}>
        <Suspense fallback={<Loading />}>
          <ApprovalList params={params} />
        </Suspense>
      </Paper>
    </>
  );
};

export default page;
