"use client";
import CalendarAttendance from "@/components/Dashboard/calendarAttendance";
import GreetingMessage from "@/components/Dashboard/greeting/GreetingMessage";
import NoticeBirth from "@/components/Dashboard/noticeBirth";
import VacationCard from "@/components/Dashboard/vacation";
import WorkHourStats from "@/components/Dashboard/workHourStats";
import { Button, Container, Grid, GridCol, Group, Stack } from "@mantine/core";
import { IconMeat } from "@tabler/icons-react";

function page() {
  return (
    <Container fluid p={"lg"}>
      <GreetingMessage />
      <Grid>
        <GridCol span={{ base: 12, md: 6 }}>
          <CalendarAttendance />
        </GridCol>
        <GridCol span={{ base: 12, md: 6 }}>
          <Stack>
            <Group wrap="nowrap">
              <Button leftSection={<IconMeat size={18} strokeWidth={1.3} />} fullWidth>
                식대
              </Button>
              <Button fullWidth>복지포인트</Button>
              <Button fullWidth>활동비</Button>
            </Group>
            <NoticeBirth />
            <VacationCard />
            <WorkHourStats />
          </Stack>
        </GridCol>
      </Grid>
    </Container>
  );
}

export default page;
