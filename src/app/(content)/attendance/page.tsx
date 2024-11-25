"use client";
import { Flex, Tabs, Text } from "@mantine/core";
import React, { useState } from "react";

function page() {
  const [activeTab, setActiveTab] = useState<string | null>("first");

  return (
    <Flex py={"lg"} px={"md"} direction={"column"}>
      <Text size="lg" fw={700}>
        근태 · 휴가
      </Text>
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="first">내 근무</Tabs.Tab>
          <Tabs.Tab value="second">내 휴가</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="first">First panel</Tabs.Panel>
        <Tabs.Panel value="second">Second panel</Tabs.Panel>
      </Tabs>
    </Flex>
  );
}

export default page;
