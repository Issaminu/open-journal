import million from "million/compiler";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "picsum.photos",
      "loremflickr.com",
      "i.pravatar.cc",
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};

const millionConfig = {
  auto: { rsc: true },
};

export default million.next(nextConfig, millionConfig);
