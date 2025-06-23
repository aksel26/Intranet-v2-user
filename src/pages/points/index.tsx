import ScrollToTop from "@/components/global/scrollTop";
import { WelfareFetchWrapper } from "@/components/points";
import WelfareInputForm from "@/components/points/create";
import { Grid, GridCol, Paper, Title } from "@mantine/core";

const Points = () => {
  return (
    <Grid>
      <GridCol span={{ base: 12, md: 8 }}>
        <WelfareFetchWrapper />
        <ScrollToTop />
      </GridCol>
      <GridCol span={{ base: 12, md: 4 }} visibleFrom="md">
        <Paper bg={"white"} py="lg" px={"lg"} radius={"lg"}>
          <Title order={5} mb={"md"}>
            복지포인트 입력
          </Title>

          <WelfareInputForm />
        </Paper>
      </GridCol>
    </Grid>
  );
};

export default Points;
