import { getUsers } from "@/app/api/get/getApi";
import { TApproval } from "@/types/apiTypes";
import { Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const UserSelect = ({ setParams, ...props }: any) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
  const [isActive, setIsActive] = useState(false);
  const [confirmList, setConfirmList] = useState([]);
  const [userValue, setUserValue] = useState<string | null>();
  useEffect(() => {
    setConfirmList(data?.data.data.filter((item: any) => item.gradeIdx <= 4));
  }, [data]);

  const selectUser = (e: any) => {
    setParams((params: TApproval) => ({ ...params, userIdx: Number(e) }));
    setUserValue(e);
    setIsActive(false);
  };
  return (
    <Select
      {...props}
      comboboxProps={{
        withinPortal: false, // 포털 비활성화로 외부 클릭 감지 개선
        // onDropdownClose: () => console.log("Dropdown closed"), // 닫힘 시 로깅
        transitionProps: { transition: "pop", duration: 200 },
        size: "sm",
      }}
      onChange={selectUser}
      value={userValue}
      data={confirmList?.map((user: any) => ({ value: user.userIdx + "", label: user.userName }))}
      size="md"
      variant="unstyled"
      fw={500}
      placeholder="승인 대상자를 선택해 주세요."
      dropdownOpened={isActive}
      onBlur={() => setIsActive(false)}
      onClick={() => setIsActive(true)}
    />
  );
};

export default UserSelect;
