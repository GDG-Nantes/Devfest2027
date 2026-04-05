import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  output: 'export',
  pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
  turbopack: {
    rules: {
      '*.yml': {
        loaders: ['yaml-loader'],
        as: 'ts',
      },
    },
  },
  webpack: (config) => {
    config.module?.rules.push({
      test: /\.ya?ml$/,
      use: 'yaml-loader',
    });
    return config;
  },
  images: {
    unoptimized: true,
  },
  typescript: {
    // TypeScript checking is done separately via `tsc --noEmit` in the build script.
    // Next.js's built-in SWC-based checker crashes on Windows WASM fallback.
    ignoreBuildErrors: true,
  },
};

const withMDX = createMDX({
  options: {},
  // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
