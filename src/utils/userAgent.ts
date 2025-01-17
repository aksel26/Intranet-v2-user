export function getDeviceType() {
  // 여러 조건을 체크하여 모바일 여부 판단
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1); // iPad Pro 체크

  return isMobile ? "MOBILE" : "PC";
}
