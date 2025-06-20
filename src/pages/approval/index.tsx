import React, { useState } from "react";
import dayjs from "dayjs";
import { Paper } from "@mantine/core";
import ScrollToTop from "@/components/global/scrollTop";
import SearchApprovals from "@/components/approval/search";

const Approval = () => {
  // const [params, setParams] = useState<TApproval>({
  //   year: dayjs().year().toString(),
  // });

  return (
    <>
      <SearchApprovals />
      <Paper bg={"white"} px="md" py="md" radius={"lg"}>
        {/* <ApprovalList params={params} /> */}
        <ScrollToTop />
      </Paper>
    </>
  );
};

export default Approval;
