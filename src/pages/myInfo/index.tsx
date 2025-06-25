// import UpdateBaseInfo from "@/components/myInfo/baseInfo";
// import UpdatePassword from "@/components/myInfo/password";

import UpdateBaseInfo from "@/components/myInfo/baseInfo";
import UpdatePassword from "@/components/myInfo/password";
import { Stack, Text, Title } from "@mantine/core";

const MyInfo = () => {
  return (
    <>
      {" "}
      <Stack gap={1} mb="xs">
        <Title order={4}>내 정보 수정</Title>
        <Text c={"gray.6"} fz={"sm"}>
          비밀번호 변경, 기본 정보 수정 등을 할 수 있습니다.
        </Text>
      </Stack>
      <UpdateBaseInfo />
      <UpdatePassword />
    </>
  );
};

export default MyInfo;
