import { Button, Group } from "@mantine/core";
import { IconCreditCard, IconSoup, IconUsersGroup } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

const WelfareButtons = () => {
  const router = useRouter();

  const handleButtonClick = (path: string) => {
    router.push(path);
  };
  return (
    <Group wrap="nowrap">
      <Button
        fullWidth
        onClick={() => handleButtonClick("/welfare/meal")}
        variant="gradient"
        gradient={{ from: "lime.2", to: "yellow.2", deg: 154 }}
        c={"lime.9"}
        fz={"xs"}
        leftSection={<IconSoup color="green" size={16} />}
      >
        식대
      </Button>
      <Button
        fullWidth
        onClick={() => handleButtonClick("/welfare/welfarePoint")}
        variant="gradient"
        gradient={{ from: "cyan", to: "green", deg: 154 }}
        c={"cyan.1"}
        fz={"xs"}
        leftSection={<IconCreditCard color="white" size={16} />}
      >
        복지포인트
      </Button>
      <Button
        fullWidth
        onClick={() => handleButtonClick("/welfare/activity")}
        variant="gradient"
        leftSection={<IconUsersGroup color="white" size={16} />}
        gradient={{ from: "violet", to: "teal", deg: 154 }}
        c={"violet.1"}
        fz={"xs"}
      >
        활동비
      </Button>
    </Group>
  );
};

export default WelfareButtons;
