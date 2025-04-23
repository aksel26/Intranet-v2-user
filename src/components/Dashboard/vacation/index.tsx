import { ActionIcon, Button, Group, Paper, Title } from "@mantine/core";
import { IconBeach, IconDots } from "@tabler/icons-react";
import React from "react";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import Vacation from "@/components/Attendance/Vacation";
import VacationSummary from "./summary";

const VacationCard = () => {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const goVacation = () => router.push("/attendance/vacation");
  return (
    <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
      <Group justify="space-between" mb={"xs"}>
        <Title order={5}>휴가 요약</Title>
        <Group>
          <Button
            variant="gradient"
            gradient={{ from: "lime", to: "cyan", deg: 90 }}
            size="xs"
            w={150}
            onClick={open}
            leftSection={<IconBeach size={22} strokeWidth={1.2} />}
          >
            휴가 신청
          </Button>
          <ActionIcon onClick={goVacation} variant="default">
            <IconDots />
          </ActionIcon>
        </Group>
      </Group>

      <VacationSummary />
      <Vacation opened={opened} close={close} />
    </Paper>
  );
};

export default VacationCard;
