// import notification from "@/components/GNB/Notification";
// import useLogout from "@/hooks/useLogout";
import notification from "@/components/common/notification";
import { Alert, Button, Group, Modal } from "@mantine/core";
import { LogOut } from "lucide-react";
// import { IconLogout2 } from "@tabler/icons-react";
// import { signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";
import React from "react";
import { useNavigate } from "react-router-dom";

const ConfirmModal = ({ opened, close }: any) => {
  //   const {
  //     mutate: logout,
  //     isError: isError_logout,
  //     isSuccess: isSuccess_logout,
  //   } = useLogout();

  //   const navigate = useNavigate();
  const handleLogoutConfirm = async () => {
    // try {
    //   logout(undefined, {
    //     onError: () => {
    //       notification({
    //         title: "로그아웃",
    //         message: "로그아웃을 실패하였습니다",
    //         color: "red",
    //       });
    //     },
    //     onSuccess: async () => {
    //       notification({
    //         title: "로그아웃",
    //         message: "로그아웃되었습니다. 다시 로그인해 주세요.",
    //         color: "green",
    //       });
    //       //   await signOut({ redirect: false });
    //       navigate("/");
    //     },
    //   });
    // } catch (error) {
    //   notification({
    //     title: "로그아웃",
    //     message: "로그아웃을 실패하였습니다",
    //     color: "red",
    //   });
    // }
  };
  return (
    <Modal opened={opened} onClose={close} withCloseButton={false} title="로그아웃" centered>
      <Alert title="로그아웃 하시겠습니까?" color="red" variant="toned" radius="md">
        로그아웃 완료 후, 로그인 페이지로 이동합니다.
      </Alert>
      <Group wrap="nowrap" mt={"md"}>
        <Button fullWidth fz={"xs"} leftSection={<LogOut size={20} strokeWidth={1.2} />} onClick={handleLogoutConfirm}>
          로그아웃
        </Button>
        <Button fullWidth variant="light" color="gray" fz="xs" onClick={close}>
          닫기
        </Button>
      </Group>

      {/* {content} */}
    </Modal>
  );
};

export default ConfirmModal;
