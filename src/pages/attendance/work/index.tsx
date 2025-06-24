import DateRangePicker from "@/components/common/datePicker";
import ScrollToTop from "@/components/common/scrollTop";
import WorkList from "@/components/work/list";
import type { TMyAttendance } from "@/types/apiTypes/apiTypes";
import { Paper, Space, Stack, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { useState } from "react";

const Work = () => {
  const [params, setParams] = useState<TMyAttendance>({
    pageNo: 1,
    perPage: 31,
    sDate: dayjs().startOf("month").format("YYYY-MM-DD"),
    eDate: dayjs().endOf("month").format("YYYY-MM-DD"),
  });
  return (
    <>
      <Stack gap={1}>
        <Title order={4}>출퇴근 관리</Title>
        <Text component="span" c={"gray.6"} fz={"sm"}>
          나의 출퇴근 내역을 조회합니다.
        </Text>
      </Stack>
      <Paper bg={"white"} px="md" py="lg" radius={"lg"} mt={"md"}>
        <DateRangePicker setParams={setParams} />
        <Space h={"md"} />
        {/* <Suspense fallback={<Loading />}> */}
        <WorkList params={params} />
        {/* </Suspense> */}
        <ScrollToTop />
      </Paper>
    </>
  );
};

export default Work;
