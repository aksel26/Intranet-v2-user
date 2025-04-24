"use client";

import { Breadcrumbs, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

import Attachment from "@/components/Attendance/Attachment";
import CancleVacation from "@/components/Attendance/CancleVacation";
import MonthSelect from "@/components/Global/dateSelect/MonthSelect";
import YearSelect from "@/components/Global/dateSelect/YearSelect";
import VacationList from "@/components/vacation/list";
import VacationSummary from "@/components/vacation/summary";
import { TYearMonth } from "@/types/apiTypes";
import dayjs from "dayjs";
import PageContainer from "@/components/Global/container";

const items = [{ title: "휴가/연차 상세조회", href: "#" }].map((item, index) => (
  <Text size="lg" fw={600} component="a" key={index}>
    {/* <Anchor href={item.href} key={index}> */}
    {item.title}
    {/* </Anchor> */}
  </Text>
));

function page() {
  const [cancelVacationOpened, { open: cancelOpenVacationModal, close: cancelVacationModalClose }] = useDisclosure(false);
  const [attachmentModalOpened, { open: attachmentModalOpen, close: attachmentModalClose }] = useDisclosure(false);

  const [params, setParams] = useState<TYearMonth>({
    year: dayjs().year().toString(),
    month: (dayjs().month() + 1).toString(),
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
      <Stack gap={1}>
        <Breadcrumbs mb={"md"}>{items}</Breadcrumbs>
        <Text component="span" c={"gray.6"} fz={"sm"}>
          나의 휴가/연차 사용 내역을 조회합니다.
        </Text>
      </Stack>
      <YearSelect setParams={setParams} w={120} />
      <VacationSummary params={params} />
      <MonthSelect setParams={setParams} w={100} />
      <VacationList params={params} openAttachmentModal={openAttachmentModal} openVacationModal={openVacationModal} />
      <CancleVacation opened={cancelVacationOpened} close={cancelVacationModalClose} details={currentVacationInfo} />
      <Attachment opened={attachmentModalOpened} close={attachmentModalClose} details={currentVacationInfo} />
      {/* <Vacation opened={opened} close={close} /> */}
    </PageContainer>
  );
}

export default page;
