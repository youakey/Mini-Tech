/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Форсируем транспиляцию через Next.js webpack — устраняет конфликт
  // ReactCurrentOwner при импорте @react-three/fiber в статическом экспорте.
  transpilePackages: ['@react-three/fiber', '@react-three/drei', 'three'],
};

module.exports = nextConfig;
