"use client";

import { TopTitle } from "@/components/content/welfare/TopTitle";
import { UsedList } from "@/components/content/welfare/UsedList";
import { useGetActivities } from "@/hooks/useGetActivity";
import { useGetWelfares } from "@/hooks/useGetWelfares";
import { activityStateStore } from "@/lib/store/actiivityStore";
import { useCombinedStore } from "@/lib/store/CombinedSotre";
import { welfareStateStore } from "@/lib/store/welfareStore";
import { Container, Flex } from "@mantine/core";
import { useEffect } from "react";

const Main = () => {
  const params = {
    year: 2024,
    month: 10,
  };
  const { data, isLoading, error } = useGetActivities(params);

  const { activityStore } = useCombinedStore() as { activityStore: activityStateStore };

  useEffect(() => {
    if (data) {
      const result = data?.data.data;
      activityStore.setActivityInfo(result);
    }
  }, [data]);
  return (
    <Container size={"xs"} p={0} bg="gray.0" style={{ scrollPaddingBottom: "52px", overflowY: "auto", scrollSnapType: "y mandatory" }}>
      <Flex direction={"column"} rowGap={"sm"}>
        <TopTitle />
        <UsedList />
      </Flex>
    </Container>
  );
};

export default Main;
