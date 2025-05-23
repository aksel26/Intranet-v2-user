import { monthlyDrink } from "@/app/api/get/getApi";
import { Box, Button, Divider, Group, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronRight } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import Details from "./details";
import LoadingView from "@/components/Global/view/LoadingView";
import { ErrorView } from "@/components/Global/view/ErrorView";

const MonthlyDrink = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data, isLoading, isError } = useQuery({ queryKey: ["monthlyDrink"], queryFn: () => monthlyDrink() });

  const config = data?.data.data.config;
  const myBaverage = data?.data.data.myBaverage;
  const details = data?.data.data.details;
  if (isLoading) return <LoadingView />;
  if (isError) return <ErrorView />;
  return (
    <Box px={"md"}>
      <Group justify="space-between" align="center">
        <Text fz={"xs"} fw={400}>
          <Text component="span" fw={600} fz={"xs"}>
            {config?.month}월{" "}
          </Text>
          Monthly Meeting 음료 신청
        </Text>

        <Group>
          <Text fz={"xs"} c={"gray"}>
            작성기한
          </Text>
          <Text fz={"xs"}>{config?.dueDate}</Text>
        </Group>
      </Group>
      <Divider my={"xs"} />
      <Stack gap={"xs"}>
        <Group>
          <Text fz={"xs"} c={"gray"}>
            픽업 :
          </Text>
          <Group>
            {config?.pickup.map((item: any, index: number) => (
              <Text key={index} fz={"xs"}>
                {item}
              </Text>
            ))}
          </Group>
        </Group>
        <Group justify="space-between" align="center">
          <Group>
            <Text fz={"xs"} c={"gray"}>
              내가 선택한 음료 :
            </Text>
            {myBaverage ? (
              <Text fz={"xs"}>{myBaverage}</Text>
            ) : (
              <Text c={"gray"} fz={"xs"}>
                아직 선택하지 않았습니다.
              </Text>
            )}
          </Group>
          <Button size="compact-xs" variant="subtle" rightSection={<IconChevronRight size={15} strokeWidth={1.2} />} onClick={open}>
            전체보기
          </Button>
        </Group>
      </Stack>

      <Details opened={opened} close={close} details={details} configId={config.configId} />
    </Box>
  );
};

export default MonthlyDrink;
