/** @type {import('next').NextConfig} */

// import withPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    // SVGR 설정 추가
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true, // true로 설정하면 width와 height를 props로 전달 가능
          },
        },
      ],
    });

    return config;
  },
};

// const pwaConfig = withPWA({
//   // dest: "public",
//   disable: process.env.NODE_ENV === "development",
//   register: true,
//   skipWaiting: true,
// });

export default nextConfig;
