import { NOTICE_CATEGORY } from "@/lib/enums/notice/notice";
import type { TNotice } from "@/types/notice";
import { Badge } from "@mantine/core";

const NoticeCategory = ({ record }: { record: TNotice }) => {
  console.log("record:", record);
  if (record.category === NOTICE_CATEGORY.NOTICE) {
    return (
      <Badge size="sm" color="lime">
        {record.category}
      </Badge>
    );
  } else if (record.category === NOTICE_CATEGORY.INTERNAL_MEETING) {
    return (
      <Badge size="sm" color="blue">
        {record.category}
      </Badge>
    );
  } else if (record.category === NOTICE_CATEGORY.EXTERNAL_MEETING) {
    return (
      <Badge size="sm" color="blue" variant="light">
        {record.category}
      </Badge>
    );
  } else if (record.category === NOTICE_CATEGORY.ETC) {
    return (
      <Badge size="sm" color="gray" variant="light">
        {record.category}
      </Badge>
    );
  }
};

export default NoticeCategory;
