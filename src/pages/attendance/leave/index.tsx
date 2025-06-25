import ScrollToTop from "@/components/common/scrollTop";
import YearSelect from "@/components/common/select/year";
import VacationSummary from "@/components/leave/summary";
import type { TYearMonth } from "@/types/apiTypes/apiTypes";
import { Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import React, { useState } from "react";
import VacationList from "../../../components/leave/list";
import CancleVacation from "@/components/leave/cancel";
import FileUpload from "@/components/leave/file";
// import CancleVacation from "@/components/leave/cancel";

const Leave = () => {
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
    <>
      <Stack gap={1} mb="xs">
        <Title order={4}>휴가/연차 상세조회</Title>
        <Text c={"gray.6"} fz={"sm"}>
          나의 휴가/연차 사용 내역을 조회합니다.
        </Text>
      </Stack>

      <YearSelect setParams={setParams} w={120} />
      {/* <Suspense fallback={"로딩.."}> */}
      <VacationSummary params={params} />
      {/* </Suspense> */}

      {/* <Suspense fallback={"로딩.."}> */}
      <VacationList params={params} setParams={setParams} openAttachmentModal={openAttachmentModal} openVacationModal={openVacationModal} />
      {/* </Suspense> */}

      <CancleVacation opened={cancelVacationOpened} close={cancelVacationModalClose} details={currentVacationInfo} />
      <FileUpload opened={attachmentModalOpened} close={attachmentModalClose} details={currentVacationInfo} />
      <ScrollToTop />
    </>
  );
};

export default Leave;
