import dayjs from "dayjs";

export const checkOutTimeValidation = (targetTime: string | null) => {
  // 입력받은 시간을 dayjs 객체로 변환
  const target = dayjs(targetTime);

  // 현재 시간을 dayjs 객체로 가져오기
  const now = dayjs();

  const diffInHours = now.diff(target, "hour");
  const remainingMinutes = now.diff(target.add(diffInHours, "hour"), "minute");
  const remainingSeconds = now.diff(
    target.add(diffInHours, "hour").add(remainingMinutes, "minute"),
    "second"
  );
  console.log(diffInHours, remainingMinutes, remainingSeconds);

  // 정확히 7시간인지 확인 (부동소수점 오차를 고려하여 근사값 비교)
  return {
    hours: diffInHours,
    minutes: remainingMinutes,
    seconds: remainingSeconds,
  };
};
