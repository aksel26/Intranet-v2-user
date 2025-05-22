import { notifications } from "@mantine/notifications";

type TNotification = {
  title: string;
  message: string | null;
  color: string;
};

export default function notification({ title, message, color, ...props }: any) {
  return notifications.show({
    title: title,
    message: message,
    position: "top-right",
    color: color,
    radius: "lg",
    ...props,
  });
}
