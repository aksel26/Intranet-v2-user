import { Button, Group } from "@mantine/core";
import { CreditCard, Soup, Users2 } from "lucide-react";
// import { IconCreditCard, IconSoup, IconUsersGroup } from "@tabler/icons-react";
// import { useRouter } from "next/navigation";
import React from "react";
import { useNavigate } from "react-router-dom";

const WelfareButtons = () => {
  const navigate = useNavigate();

  const handleButtonClick = (path: string) => {
    navigate(path);
  };
  return (
    <Group wrap="nowrap">
      <Button
        fullWidth
        onClick={() => handleButtonClick("/meal")}
        variant="gradient"
        gradient={{ from: "lime.2", to: "yellow.2", deg: 154 }}
        c={"lime.9"}
        fz={"xs"}
        leftSection={<Soup color="green" size={16} />}
      >
        식대
      </Button>
      <Button
        fullWidth
        onClick={() => handleButtonClick("/points")}
        variant="gradient"
        gradient={{ from: "cyan", to: "green", deg: 154 }}
        c={"cyan.1"}
        fz={"xs"}
        leftSection={<CreditCard color="white" size={16} />}
      >
        복지포인트
      </Button>
      <Button
        fullWidth
        onClick={() => handleButtonClick("/activity")}
        variant="gradient"
        leftSection={<Users2 color="white" size={16} />}
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
