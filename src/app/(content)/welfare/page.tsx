"use client";

import { TopTitle } from "@/components/content/welfare/TopTitle";
import { UsedList } from "@/components/content/welfare/UsedList";
import { WelfareBalance } from "@/components/content/welfare/WelfareBalance";
import { useGetWelfares } from "@/hooks/useGetWelfares";
import { Container, Flex } from "@mantine/core";

const Main = () => {
  const params = {
    year: 2024,
    month: 10,
  };
  const { data: welfare, isLoading, error } = useGetWelfares(params);
  console.log("🚀 ~ Main ~ welfare:", welfare);

  const welfareStats = welfare?.data.data;

  return (
    <Container size={"xs"} p={0} bg="gray.0" h={"calc(100vh - 52px)"} style={{ scrollPaddingBottom: "52px", overflowY: "auto", scrollSnapType: "y mandatory" }}>
      <Flex direction={"column"} rowGap={"sm"}>
        <TopTitle />
        <WelfareBalance welfareStats={welfareStats} />
        <UsedList />
      </Flex>
    </Container>
  );
};

export default Main;
