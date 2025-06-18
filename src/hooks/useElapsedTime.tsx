import { useState, useEffect, useCallback } from "react";
import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// dayjs 플러그인 확장
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

interface CheckInProgressResult {
  percentage: number;
  remainingTime: {
    hours: number;
    minutes: number;
    seconds: number;
    formatted: string;
  };
  elapsedTime: {
    hours: number;
    minutes: number;
    seconds: number;
    formatted: string;
  };
  isCheckOutAvailable: boolean;
  isBeforeCheckIn: boolean;
}

interface UseCheckInProgressOptions {
  updateInterval?: number; // 업데이트 간격 (ms), 기본값: 1000ms
  timezone?: string; // 타임존 설정
}

/**
 * 체크인 진행률을 계산하는 React Custom Hook
 * @param checkInTime - 체크인 시간 (ISO 8601 형식)
 * @param availCheckOutTime - 체크아웃 가능 시간 (ISO 8601 형식)
 * @param options - 옵션 설정
 * @returns 진행률 정보 객체
 */
export function useCheckInProgress(checkInTime: string, availCheckOutTime?: string | undefined | null, options: UseCheckInProgressOptions = {}): CheckInProgressResult {
  const { updateInterval = 1000, timezone } = options;

  const [currentTime, setCurrentTime] = useState<Dayjs>(() => (timezone ? dayjs().tz(timezone) : dayjs()));

  // 진행률 계산 함수
  const calculateProgress = useCallback(() => {
    const checkIn = dayjs(checkInTime);
    const checkOut = dayjs(availCheckOutTime);
    const current = currentTime;

    // 전체 기간 (밀리초)
    const totalDuration = checkOut.diff(checkIn);

    // 경과 시간 (밀리초)
    const elapsedDuration = current.diff(checkIn);

    // 남은 시간 (밀리초)
    const remainingDuration = checkOut.diff(current);

    // 체크인 전인지 확인
    const isBeforeCheckIn = current.isBefore(checkIn);

    // 체크아웃 가능한지 확인
    const isCheckOutAvailable = current.isAfter(checkOut) || current.isSame(checkOut);

    // 백분율 계산
    let percentage = 0;
    if (!isBeforeCheckIn && !isCheckOutAvailable && totalDuration > 0) {
      percentage = (elapsedDuration / totalDuration) * 100;
    } else if (isCheckOutAvailable) {
      percentage = 100;
    }

    // 소수점 둘째 자리까지 반올림
    percentage = Math.round(percentage * 100) / 100;

    // 남은 시간 계산
    const remainingTimeDuration = dayjs.duration(Math.max(0, remainingDuration));
    const remainingTime = {
      hours: Math.floor(remainingTimeDuration.asHours()),
      minutes: remainingTimeDuration.minutes(),
      seconds: remainingTimeDuration.seconds(),
      formatted: isCheckOutAvailable ? "체크아웃 가능" : `${Math.floor(remainingTimeDuration.asHours())}시간 ${remainingTimeDuration.minutes()}분 ${remainingTimeDuration.seconds()}초 남음`,
    };

    // 경과 시간 계산
    const elapsedTimeDuration = dayjs.duration(Math.max(0, elapsedDuration));
    const elapsedTime = {
      hours: Math.floor(elapsedTimeDuration.asHours()),
      minutes: elapsedTimeDuration.minutes(),
      seconds: elapsedTimeDuration.seconds(),
      formatted: isBeforeCheckIn ? "체크인 전" : `${Math.floor(elapsedTimeDuration.asHours())}시간 ${elapsedTimeDuration.minutes()}분 ${elapsedTimeDuration.seconds()}초 경과`,
    };

    return {
      percentage,
      remainingTime,
      elapsedTime,
      isCheckOutAvailable,
      isBeforeCheckIn,
    };
  }, [checkInTime, availCheckOutTime, currentTime]);

  // 타이머 설정
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(timezone ? dayjs().tz(timezone) : dayjs());
    }, updateInterval);

    return () => clearInterval(timer);
  }, [updateInterval, timezone]);

  return calculateProgress();
}
