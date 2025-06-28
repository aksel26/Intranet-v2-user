import { NOTICE_CATEGORY } from "@/lib/enums/notice/notice";
import type { TNotice } from "@/types/notice";
import { Badge } from "@mantine/core";
import { useMemo, useState } from "react";

const NoticeCategory = ({ record }: { record: TNotice }) => {
  console.log("record:", record);

  const color = useMemo(() => {
    const { category } = record;
    if (category === "외부미팅" || category === "내부미팅") {
      return "blue";
    } else if (category === "공지사항") {
      return "lime";
    } else return "gray";
  }, [record]);

  return (
    <Badge size="sm" color={color}>
      {record.category}
    </Badge>
  );
};

export default NoticeCategory;
