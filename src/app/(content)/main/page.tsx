"use client";
import CalendarAttendance from "@/components/Dashboard/calendarAttendance";
import GreetingMessage from "@/components/Dashboard/greeting/GreetingMessage";
import NoticeBirth from "@/components/Dashboard/noticeBirth";
import VacationCard from "@/components/Dashboard/vacation";
import WelfareButtons from "@/components/Dashboard/welfareButtons";
import WorkHourStats from "@/components/Dashboard/workHourStats";
import PageContainer from "@/components/Global/container";
import { Grid, GridCol, Stack } from "@mantine/core";

function page() {
  return (
    <>
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
    </>
  );
}

export default page;
