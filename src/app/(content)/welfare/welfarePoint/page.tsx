"use client";

import { WelfareFetchWrapper } from "@/components/content/welfare/WelfareFetchWrapper";
import WelfareInputForm from "@/components/content/welfare/WelfareInputForm";
import PageContainer from "@/components/Global/container";
import { Grid, GridCol, Paper, Title } from "@mantine/core";
import { Suspense } from "react";
import Loading from "../loading";

const WelfareMain = () => {
  return (
    <PageContainer>
      <Grid>
        <GridCol span={{ base: 12, md: 8 }}>
          <Suspense fallback={<Loading />}>
            <WelfareFetchWrapper />
          </Suspense>
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
    </PageContainer>
  );
};

export default WelfareMain;
