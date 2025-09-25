/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    production: process.env.ENVIRONMENT,
    baseUrl: process.env.BASE_URL || "http://localhost:3000",
    s3BucketUrl: `https://${process.env.S3_OUR_HUT_BUCKET}.s3.amazonaws.com`,
  },
  images: {
    domains: [
      "ourhut.s3.amazonaws.com",
      "upload.wikimedia.org",
      "our-hut-dev.s3.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
