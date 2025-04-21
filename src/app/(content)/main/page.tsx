"use client";
import CalendarAttendance from "@/components/Dashboard/calendarAttendance";
import GreetingMessage from "@/components/Dashboard/greeting/GreetingMessage";
import NoticeBirth from "@/components/Dashboard/noticeBirth";
import VacationCard from "@/components/Dashboard/vacation";
import WelfareButtons from "@/components/Dashboard/welfareButtons";
import WorkHourStats from "@/components/Dashboard/workHourStats";
import { Button, Container, Grid, GridCol, Group, Stack } from "@mantine/core";
import { IconCreditCard, IconMeat, IconSoup, IconUsersGroup } from "@tabler/icons-react";

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
            <WelfareButtons />
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
