import React from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import TelegramBanner from "@/components/section/TelegramBanner";
import FeatureCard from "@/components/feature/FeatureCard";

const featureData = [
    {
        title: "Text to 3D Models",
        path: "/3d",
        image: "/assets/image/3D.webp",
        description: "Transform your words into stunning 3D models with AI-powered precision and creativity.",
    },
    {
        title: "Text to Music",
        path: "/music",
        image: "/assets/image/Music.webp",
        description: "Compose original melodies effortlessly—just describe your vibe, and let AI create the soundtrack.",
        isComingSoon: true
    },
    {
        title: "Text to Programs",
        path: "/program",
        image: "/assets/image/Program.webp",
        description: "Turn ideas into clean, functional code with AI that understands your programming needs.",
        isComingSoon: true
    },
    {
        title: "Text to NFT",
        path: "/nft",
        image: "/assets/image/NFT.webp",
        description: "Design unique, AI-generated NFTs ready for your next digital collection or marketplace.",
        isComingSoon: true
    },
    {
        title: "Text to Metaverse",
        path: "/metaverse",
        image: "/assets/image/Metaverse.webp",
        description: "Bring virtual worlds to life by generating immersive Metaverse-ready assets with AI.",
        isComingSoon: true
    },
    {
        title: "Text to Game",
        path: "/game",
        image: "/assets/image/Game.webp",
        description: "Fuel your game development with AI-generated assets, mechanics, and concepts in seconds.",
        isComingSoon: true
    },
];

const Feature: React.FC = () => {
    return (
        <SidebarLayout>
            <div className="mb-10 md:mb-12 py-6">
                <h1 className="text-2xl md:text-4xl font-bold text-white text-center drop-shadow-lg mb-2">
                    Transform Ideas into Reality with AI-Powered Creativity
                    <span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-accent-400">
                        {" "}Aithereum
                    </span>
                </h1>
                <p className="text-secondary-500 text-center mb-8 text-lg max-w-7xl mx-auto">
                    Aithereum empowers you to transform text into innovative 3D models, music, programs, NFTs, metavers
                    assets, and games. Unleash your creativity with cutting-edge AI tools designed to explore, create,
                    and innovate effortlessly
                </p>

                <div className="grid gap-6 px-2 xl:px-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {featureData.map((service) => (
                        <FeatureCard
                            key={service.title}
                            title={service.title}
                            path={service.path}
                            image={service.image}
                            description={service.description}
                            isComingSoon={service.isComingSoon}
                        />
                    ))}
                </div>

                <TelegramBanner/>
            </div>
        </SidebarLayout>
    );
};

export default Feature;
