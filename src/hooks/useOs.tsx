"use client";

function useOs() {
  const userAgent = navigator.userAgent.toLowerCase();
  const platform = navigator.platform.toLowerCase();

  const deviceInfo: any = {
    // 운영체제 확인
    os: {
      windows: /windows/.test(userAgent),
      mac: /mac/.test(userAgent),
      linux: /linux/.test(userAgent),
      ios: /iphone|ipad|ipod/.test(userAgent),
      android: /android/.test(userAgent),
    },

    // 모바일 여부 확인
    isMobile: {
      android: /android/.test(userAgent),
      ios: /iphone|ipad|ipod/.test(userAgent),
      any: function () {
        return this.android || this.ios;
      },
    },

    // 브라우저 확인
    browser: {
      chrome: /chrome/.test(userAgent) && !/edge/.test(userAgent),
      safari: /safari/.test(userAgent) && !/chrome/.test(userAgent),
      firefox: /firefox/.test(userAgent),
      opera: /opera/.test(userAgent),
      edge: /edge/.test(userAgent),
      ie: /msie|trident/.test(userAgent),
    },

    // 화면 정보
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      orientation: window.screen.orientation?.type || "",
    },

    // 기타 정보
    language: navigator.language,
    platform: platform,
    userAgent: userAgent,

    // 터치 지원 여부
    touchSupport: "ontouchstart" in window || navigator.maxTouchPoints > 0,
  };

  console.log("deviceInfo: ", deviceInfo);
  return deviceInfo;
}

export default useOs;
