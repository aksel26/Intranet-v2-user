import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ConfirmModal from "./confirm";
// import ConfirmModal from "./confirmModal";

const LogoutButton = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const handleLogoutConfirm = () => open();

  return (
    <>
      <Button size="xs" variant="light" onClick={handleLogoutConfirm} fullWidth>
        로그아웃
      </Button>
      <ConfirmModal opened={opened} close={close} />
    </>
  );
};

export default LogoutButton;
