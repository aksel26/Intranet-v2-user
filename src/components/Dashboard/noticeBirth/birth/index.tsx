import React from "react";
import * as api from "@/app/api/get/getApi";
import { useQuery } from "@tanstack/react-query";
import { Group, Loader, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
const Birth = ({ month }: { month: string }) => {
  const { data, isLoading, isError } = useQuery({ queryKey: ["notices", { month: month }], queryFn: () => api.getBirth({ month }) });
  const birth = data?.data.data;
  return (
    <Stack gap={"md"}>
      {isLoading ? (
        <Loader size={"sm"} />
      ) : birth.length === 0 ? (
        <Text ta={"center"} fz={"xs"} my={"md"} c={"gray.6"}>
          생일자가 없습니다.
        </Text>
      ) : (
        birth.map((item: any) => (
          <Group key={item.userIdx}>
            <Text fz={"sm"} w={130}>
              🎉 {item.userName}
              <Text component="span" ml={"xs"} fz={"sm"}>
                {item.gradeName}
              </Text>
            </Text>

            <Text fz={"sm"}>{dayjs(item.userBirth).format("MM월 DD일")}</Text>
          </Group>
        ))
      )}
    </Stack>
  );
};

export default Birth;
