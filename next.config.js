/** @type {import('next').NextConfig} */

const {
  NEXT_PUBLIC_BASE_RSVP_URL,
} = process.env;

const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    NEXT_PUBLIC_BASE_RSVP_URL,
  }
}

module.exports = nextConfig
