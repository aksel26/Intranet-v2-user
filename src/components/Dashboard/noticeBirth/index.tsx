import { Button, Group, Paper, Tabs } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Birth from "./birth";
import Notice from "./notice";
import { mainDateStore } from "@/lib/store/mainDateStore";
import Fireworks from "react-canvas-confetti/dist/presets/realistic";
import MonthlyDrink from "./drink";
const NoticeBirth = () => {
  const { dateValue } = mainDateStore();
  const [activeTab, setActiveTab] = useState<string | null>("notice");
  const router = useRouter();
  const goNotice = () => router.push("/notice");

  const heightRef = useRef<HTMLDivElement>(null);

  const cardHeight = heightRef?.current?.offsetHeight || 0;

  return (
    <Paper
      p={"lg"}
      radius={"lg"}
      className={activeTab === "birth" ? "bg-gradient-to-r from-yellow-100 to-red-100" : ""}
      ref={heightRef}
      mah={500}
      styles={{ root: { overflow: "scroll" } }}
    >
      <Tabs value={activeTab} onChange={setActiveTab} variant="pills" radius={"md"}>
        <Tabs.List justify="space-between">
          <Group styles={{ root: { zIndex: 1 } }}>
            <Tabs.Tab fz="xs" value="notice">
              공지사항
            </Tabs.Tab>
            <Tabs.Tab
              bg={activeTab === "birth" ? "pink.1" : "transparent"}
              c={activeTab === "birth" ? "pink.4" : "black"}
              fw={activeTab === "birth" ? 500 : 400}
              fz="xs"
              value="birth"
            >
              생일자
            </Tabs.Tab>
            <Tabs.Tab
              bg={activeTab === "monthlyDrink" ? "green.8" : "transparent"}
              c={activeTab === "monthlyDrink" ? "green.1" : "black"}
              fw={activeTab === "monthlyDrink" ? 500 : 400}
              fz="xs"
              value="monthlyDrink"
            >
              Monthly 음료
            </Tabs.Tab>
          </Group>
          {activeTab === "notice" && (
            <Button size="xs" variant="subtle" onClick={goNotice} rightSection={<IconChevronRight size={18} strokeWidth={1.2} />}>
              더보기
            </Button>
          )}
        </Tabs.List>

        <Tabs.Panel value="notice" pt={"xs"}>
          <Notice />
        </Tabs.Panel>
        <Tabs.Panel value="birth" pt={"xs"} pos={"relative"}>
          <Birth month={(dayjs(dateValue).month() + 1).toString()} />
          {activeTab === "birth" && (
            <Fireworks autorun={{ speed: 0.2 }} style={{ position: "absolute", width: "100%", height: cardHeight, right: 0, top: -50, zIndex: 0 }} />
          )}
        </Tabs.Panel>
        <Tabs.Panel value="monthlyDrink" pt={"xs"} pos={"relative"}>
          <MonthlyDrink />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
};

export default NoticeBirth;
