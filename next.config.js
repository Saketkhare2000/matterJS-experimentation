/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "images.unsplash.com",
            "res.cloudinary.com",
            "cdn.hashnode.com",
        ],
    },
};

module.exports = nextConfig;
