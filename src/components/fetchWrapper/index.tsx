import { Group, Loader, Text } from "@mantine/core";
import React from "react";

const FetchWrapper = ({ children, data, isLoading }: any) => {
  if (isLoading) {
    return (
      <Group justify="center" py={"xl"}>
        <Loader color="blue" type="dots" />
      </Group>
    );
  }
  if (data.length === 0) {
    return (
      <Group justify="center" py={"xl"}>
        <Text fz={"sm"} c={"gray.6"}>
          조회된 내역이 없습니다.
        </Text>
      </Group>
    );
  }
  return <>{children}</>;
};

export default FetchWrapper;
