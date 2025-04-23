import { Button, Group, Paper, Tabs } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Birth from "./birth";
import Notice from "./notice";
import { mainDateStore } from "@/lib/store/mainDateStore";

const NoticeBirth = () => {
  const { dateValue } = mainDateStore();
  const [activeTab, setActiveTab] = useState<string | null>("notice");
  const router = useRouter();
  const goNotice = () => router.push("/notice");

  const heightRef = useRef<HTMLDivElement>(null);

  return (
    <Paper p={"lg"} radius={"lg"} className={activeTab === "birth" ? "bg-gradient-to-r from-yellow-100 to-red-100" : ""} ref={heightRef}>
      <Tabs value={activeTab} onChange={setActiveTab} variant="pills" radius={"lg"}>
        <Tabs.List justify="space-between">
          <Group styles={{ root: { zIndex: 1 } }}>
            <Tabs.Tab value="notice">공지사항</Tabs.Tab>
            <Tabs.Tab
              bg={activeTab === "birth" ? "pink.1" : "transparent"}
              c={activeTab === "birth" ? "pink.4" : "black"}
              fw={activeTab === "birth" ? 600 : 400}
              value="birth"
            >
              생일자
            </Tabs.Tab>
          </Group>
          {activeTab === "notice" && (
            <Button size="xs" variant="subtle" onClick={goNotice} rightSection={<IconChevronRight size={18} strokeWidth={1.2} />}>
              더보기
            </Button>
          )}
        </Tabs.List>

        <Tabs.Panel value="notice" pt={"md"}>
          <Notice />
        </Tabs.Panel>
        <Tabs.Panel value="birth" pt={"md"}>
          <Birth activeTab={activeTab} month={(dayjs(dateValue).month() + 1).toString()} ref={heightRef} />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
};

export default NoticeBirth;
