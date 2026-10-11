// next.config.mjs
import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // Keeps dev mode fast and disables SW caching locally
  fallbacks: {
    document: '/offline', // Redirects uncached document requests to /offline when offline
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.1.8', 'localhost:3000'],
  reactStrictMode: true,
  turbopack: {},
  /* keep any other existing configs here */
};

export default withPWA(nextConfig);