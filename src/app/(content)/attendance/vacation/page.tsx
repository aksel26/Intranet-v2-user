"use client";

import { Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

import Attachment from "@/components/Attendance/Attachment";
import CancleVacation from "@/components/Attendance/CancleVacation";
import PageContainer from "@/components/Global/container";
import YearSelect from "@/components/Global/dateSelect/YearSelect";
import VacationList from "@/components/vacation/list";
import VacationSummary from "@/components/vacation/summary";
import { TYearMonth } from "@/types/apiTypes";
import dayjs from "dayjs";
import MonthFilter from "@/components/ui/monthFilter";

function page() {
  const [cancelVacationOpened, { open: cancelOpenVacationModal, close: cancelVacationModalClose }] = useDisclosure(false);
  const [attachmentModalOpened, { open: attachmentModalOpen, close: attachmentModalClose }] = useDisclosure(false);

  const [params, setParams] = useState<TYearMonth>({
    year: dayjs().year().toString(),
  });

  const [currentVacationInfo, setCurrentVacationInfo] = useState();

  const openVacationModal = (record: any) => {
    setCurrentVacationInfo(record);
    cancelOpenVacationModal();
  };
  const openAttachmentModal = (record: any) => {
    setCurrentVacationInfo(record);
    attachmentModalOpen();
  };

  return (
    <PageContainer>
      <Stack gap={1} mb="xs">
        <Text size="lg" fw={600}>
          휴가/연차 상세조회
        </Text>
        <Text c={"gray.6"} fz={"sm"}>
          나의 휴가/연차 사용 내역을 조회합니다.
        </Text>
      </Stack>
      <YearSelect setParams={setParams} w={120} />
      <VacationSummary params={params} />
      <MonthFilter trigger={setParams} />

      {/* <MonthSelect setParams={setParams} w={100} /> */}
      <VacationList params={params} openAttachmentModal={openAttachmentModal} openVacationModal={openVacationModal} />
      <CancleVacation opened={cancelVacationOpened} close={cancelVacationModalClose} details={currentVacationInfo} />
      <Attachment opened={attachmentModalOpened} close={attachmentModalClose} details={currentVacationInfo} />
      {/* <Vacation opened={opened} close={close} /> */}
    </PageContainer>
  );
}

export default page;
