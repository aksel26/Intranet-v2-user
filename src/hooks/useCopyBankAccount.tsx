import notification from "@/components/common/notification";
import { Check, X } from "lucide-react";

const useCopyBankAccount = () => {
  const copyBankAccount = async () => {
    try {
      await navigator.clipboard.writeText("국민 005701-04-142344 ㈜에이시지알").then(() => {
        notification({
          title: "입금 계좌번호 복사 완료",
          message: "국민 005701-04-142344 ㈜에이시지알",
          color: "green",
          icon: <Check size={16} />,
        });
      });
    } catch (error) {
      notification({
        title: "입금 계좌번호 복사",
        message: "입금 계좌번호 복사 중 문제가 발생했습니다.",
        color: "red",
        icon: <X size={16} />,
      });
    }
  };

  return { copyBankAccount };
};

export default useCopyBankAccount;
