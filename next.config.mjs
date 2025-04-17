import { withSentryConfig } from "@sentry/nextjs";
/** @type {import('next').NextConfig} */

// import withPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["acg-benefit.s3.ap-northeast-2.amazonaws.com"],
  },
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

const config =
  process.env.NODE_ENV === "production"
    ? withSentryConfig(
        withSentryConfig(nextConfig, {
          // For all available options, see:
          // https://www.npmjs.com/package/@sentry/webpack-plugin#options

          org: "84e4f17bf7f8",
          project: "intranet-user",

          // Only print logs for uploading source maps in CI
          silent: !process.env.CI,

          // For all available options, see:
          // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

          // Upload a larger set of source maps for prettier stack traces (increases build time)
          widenClientFileUpload: true,

          // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
          // This can increase your server load as well as your hosting bill.
          // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
          // side errors will fail.
          // tunnelRoute: "/monitoring",

          // Automatically tree-shake Sentry logger statements to reduce bundle size
          disableLogger: true,

          // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
          // See the following for more information:
          // https://docs.sentry.io/product/crons/
          // https://vercel.com/docs/cron-jobs
          automaticVercelMonitors: true,
        })
      )
    : nextConfig;

export default config;
