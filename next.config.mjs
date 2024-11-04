/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.pamador.com.tm',
        port: '9000',
        pathname: '/**',
      },
    ],
  },
}
export default nextConfig
