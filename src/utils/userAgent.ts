export function getDeviceType() {
  // 여러 조건을 체크하여 모바일 여부 판단
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1); // iPad Pro 체크

  return isMobile ? "MOBILE" : "PC";
}

export const detectDevice = (userAgent: string) => {
  if (!userAgent) return "-";
  // 소문자로 변환하여 비교
  const ua = userAgent.toLowerCase();

  // 모바일 관련 키워드 목록
  const mobileKeywords = ["mobile", "android", "iphone", "ipad", "blackberry", "iemobile", "opera mini"];

  // 키워드가 하나라도 포함되면 모바일로 판단
  for (const keyword of mobileKeywords) {
    if (ua.includes(keyword)) {
      return "모바일";
    }
  }
  return "PC";
};
