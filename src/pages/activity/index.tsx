import ScrollToTop from "@/components/common/scrollTop";
import { Grid, GridCol, Paper, Title } from "@mantine/core";
// import ActivityInputForm from "./create";
import { ActivityFetchWrapper } from "@/components/activity";
import ActivityInputForm from "@/components/activity/create";

const Activity = () => {
  return (
    <Grid>
      <GridCol span={{ base: 12, md: 8 }}>
        <ActivityFetchWrapper />
      </GridCol>
      <GridCol span={{ base: 12, md: 4 }} visibleFrom="md">
        <Paper bg={"white"} py="lg" px={"lg"} radius={"lg"}>
          <Title order={5} mb={"md"}>
            활동비 입력
          </Title>

          <ActivityInputForm />
        </Paper>
      </GridCol>
      <ScrollToTop />
    </Grid>
  );
};

export default Activity;
