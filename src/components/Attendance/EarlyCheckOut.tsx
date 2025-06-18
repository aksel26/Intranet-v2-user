import { myInfoStore } from "@/lib/store/myInfoStore";
import { formatTime } from "@/utils/dateFomat";
import { Group, Stack, Text, TextInput } from "@mantine/core";

function EarlyCheckOut({ reasonRef }: any) {
  const { myInfo } = myInfoStore();
  const availableCheckoutTime = formatTime(myInfo?.availCheckOutTime ?? null);
  return (
    <Stack gap={5} mt={"md"}>
      <Text fz={"sm"} styles={{ root: { wordBreak: "keep-all" } }} c={"yellow.8"}>
        퇴근 가능 시간이 경과되지 않아 <br />
        정상 퇴근을 할 수 없습니다.
      </Text>
      <Group gap={"xs"} align="center" mt={"xs"}>
        <Text fz={"xs"} c={"gray"}>
          퇴근 가능시간
        </Text>
        <Text fz={"xs"}>{availableCheckoutTime}</Text>
      </Group>
      <TextInput ref={reasonRef} mt={"md"} label="사유 입력" description="조기 퇴근 사유를 입력해 주세요." placeholder="퇴근 사유를 입력해 주세요." />
    </Stack>
  );
}

export default EarlyCheckOut;
