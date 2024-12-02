import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"]
  },
  reactStrictMode: true,
  eslint: {
    dirs: ['src'],
  },
  transpilePackages: ['three'],
};
module.exports = {
  // 自動的にSSRを無効化する設定はないが、必要に応じてデフォルトページやコンポーネントでSSG/SSRを避ける
  reactStrictMode: true,
}
export default nextConfig;
