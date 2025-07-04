import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "aithereum.org",
            },
            {
                protocol: "https",
                hostname: "api.aithereum.org",
            },
            {
                protocol: "http",
                hostname: "localhost",
            },
        ],
    },
};

export default nextConfig;
