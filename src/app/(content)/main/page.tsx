"use client";
import CalendarAttendance from "@/components/Dashboard/calendarAttendance";
import GreetingMessage from "@/components/Dashboard/greeting/GreetingMessage";
import NoticeBirth from "@/components/Dashboard/noticeBirth";
import VacationCard from "@/components/Dashboard/vacation";
import WelfareButtons from "@/components/Dashboard/welfareButtons";
import WorkHourStats from "@/components/Dashboard/workHourStats";
import { Grid, GridCol, Stack } from "@mantine/core";
import { Suspense } from "react";
import Loading from "./loading";
import ScrollToTop from "@/components/Global/scrollToTop";

function page() {
  return (
    <>
      <GreetingMessage />
      <Grid>
        <GridCol span={{ base: 12, md: 6 }}>
          <Suspense fallback={<Loading />}>
            <CalendarAttendance />
          </Suspense>
        </GridCol>
        <GridCol span={{ base: 12, md: 6 }}>
          <Stack>
            <WelfareButtons />
            <Suspense fallback={<Loading />}>
              <NoticeBirth />
            </Suspense>
            <Suspense fallback={<Loading />}>
              <VacationCard />
            </Suspense>
            <Suspense fallback={<Loading />}>
              <WorkHourStats />
            </Suspense>
          </Stack>
        </GridCol>
        <ScrollToTop />
      </Grid>
    </>
  );
}

export default page;
