import { Stack, Text, TextInput } from "@mantine/core";

function EarlyCheckOut({ reasonRef }: any) {
  return (
    <Stack gap={5} mt={"md"}>
      <Text
        fz={"sm"}
        styles={{ root: { wordBreak: "keep-all" } }}
        c={"yellow.8"}
      >
        일일 근무시간 9시간이 경과되지 않아 <br />
        정상 퇴근을 할 수 없습니다.
      </Text>

      <TextInput
        ref={reasonRef}
        mt={"md"}
        label="사유 입력"
        description="부득이한 조기 퇴근 사유를 입력해 주세요."
        placeholder="퇴근 사유를 입력해 주세요."
      />
    </Stack>
  );
}

export default EarlyCheckOut;
