import ScrollToTop from "@/components/global/scrollTop";
import CalendarAttendance from "@/components/main/calendar";
import GreetingMessage from "@/components/main/greeting";
import NoticeBirth from "@/components/main/noticeBirth";
import WelfareButtons from "@/components/main/welfareButtons";
import WorkHourStats from "@/components/main/workHourStats";
import VacationCard from "@/components/vacation";
import { Grid, GridCol, Stack } from "@mantine/core";
import React from "react";

const Main = () => {
  return (
    <div>
      <GreetingMessage />
      <Grid>
        <GridCol span={{ base: 12, md: 6 }}>
          {/* <Suspense fallback={<Loading />}> */}
          <CalendarAttendance />
          {/* </Suspense> */}
        </GridCol>
        <GridCol span={{ base: 12, md: 6 }}>
          <Stack>
            <WelfareButtons />
            {/* <Suspense fallback={<Loading />}> */}
            <NoticeBirth />
            {/* </Suspense> */}
            {/* <Suspense fallback={<Loading />}> */}
            <VacationCard />
            {/* </Suspense> */}
            {/* <Suspense fallback={<Loading />}> */}
            <WorkHourStats />
            {/* </Suspense> */}
          </Stack>
        </GridCol>
        <ScrollToTop />
      </Grid>
    </div>
  );
};

export default Main;
