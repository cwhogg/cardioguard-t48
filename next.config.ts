import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['gray-matter', 'remark', 'remark-html']
  }
}

export default nextConfig