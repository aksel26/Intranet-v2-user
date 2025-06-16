"use client";

import { useDisclosure } from "@mantine/hooks";
import { Suspense, useState } from "react";

import Attachment from "@/components/Attendance/Attachment";
import CancleVacation from "@/components/Attendance/CancleVacation";
import YearSelect from "@/components/Global/dateSelect/YearSelect";
import VacationList from "@/components/vacation/list";
import VacationSummary from "@/components/vacation/summary";
import { TYearMonth } from "@/types/apiTypes";
import dayjs from "dayjs";
import ScrollToTop from "@/components/Global/scrollToTop";
import { ScrollArea } from "@mantine/core";
// import Loading from "../loading";

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
    <>
      <ScrollToTop />
      <YearSelect setParams={setParams} w={120} />
      <Suspense fallback={"로딩.."}>
        <VacationSummary params={params} />
      </Suspense>

      <Suspense fallback={"로딩.."}>
        <VacationList params={params} setParams={setParams} openAttachmentModal={openAttachmentModal} openVacationModal={openVacationModal} />
      </Suspense>

      <CancleVacation opened={cancelVacationOpened} close={cancelVacationModalClose} details={currentVacationInfo} />
      <Attachment opened={attachmentModalOpened} close={attachmentModalClose} details={currentVacationInfo} />

      {/* <Vacation opened={opened} close={close} /> */}
    </>
  );
}

export default page;
