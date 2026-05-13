/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/Mini-Tech',
  assetPrefix: '/Mini-Tech',
  images: {
    unoptimized: true,
  },
  // Форсируем транспиляцию через Next.js webpack — устраняет конфликт
  // ReactCurrentOwner при импорте @react-three/fiber в статическом экспорте.
  transpilePackages: ['@react-three/fiber', '@react-three/drei', 'three'],
};

module.exports = nextConfig;
