/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {

        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '',
            },
            {
                protocol: 'http',
                hostname: '44.211.47.231',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'roxana99web.hopto.org',
                port: '',
            },
        ]
    },
};

export default nextConfig;
