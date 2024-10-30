"use client";

import { TopTitle } from "@/components/content/welfare/TopTitle";
import { UsedList } from "@/components/content/welfare/UsedList";
import { WelfareBalance } from "@/components/content/welfare/WelfareBalance";
import { useGetWelfares } from "@/hooks/useGetWelfares";
import { useCombinedStore } from "@/lib/store/CombinedSotre";
import { welfareStateStore } from "@/lib/store/welfareStore";
import { Container, Flex } from "@mantine/core";
import { useEffect } from "react";

const Main = () => {
  const params = {
    year: 2024,
    month: 10,
  };
  const { data, isLoading, error } = useGetWelfares(params);

  const { welfareStore } = useCombinedStore() as { welfareStore: welfareStateStore };

  useEffect(() => {
    if (data) {
      const result = data?.data.data;
      welfareStore.setwelfareInfo(result);
    }
  }, [data]);

  return (
    <Container size={"xs"} p={0} bg="gray.0" style={{ scrollPaddingBottom: "52px", overflowY: "auto", scrollSnapType: "y mandatory" }}>
      <Flex direction={"column"} rowGap={"sm"}>
        <TopTitle />
        {/* <WelfareBalance /> */}
        <UsedList />
      </Flex>
    </Container>
  );
};

export default Main;
