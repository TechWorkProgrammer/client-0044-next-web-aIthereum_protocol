import React from "react";
import {FaMedium, FaXTwitter} from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/router";
import { RiTelegram2Fill } from "react-icons/ri";

const quickLinks = [
    {label: "About", path: "#about"},
    {label: "Product", path: "#product"},
    {label: "Studio", path: "#studio"},
    {label: "Pricing", path: "#pricing"},
    {label: "Documentation", path: "https://cdnc.heyzine.com/files/uploaded/v2/2db09f371c13bcf9801b5d3209d9855326c01726.pdf"},
];

const Footer: React.FC = () => {
    const router = useRouter();
    return (
        <footer className="relative w-full text-secondary py-10">
            <div className="container mx-auto px-4 lg:px-16 z-2">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                    <div className="text-left">
                        <button
                            onClick={() => router.push("/")}
                            className="flex items-center space-x-2 w-auto h-8 md:h-10"
                        >
                            <div className="relative w-8 h-8 md:w-10 md:h-10">
                                <Image
                                    src="/icon.png"
                                    alt="Aithereum Logo"
                                    fill
                                    sizes="(max-width: 768px) 32px, (max-width: 1200px) 40px, 48px"
                                    style={{objectFit: "contain"}}
                                    priority
                                />
                            </div>
                            <span className="text-white font-semibold text-xl md:text-2xl">
                                Aithereum
                            </span>
                        </button>
                    </div>
                    <div className="text-left">
                        <ul className="flex flex-row space-x-4 items-end md:mt-12">
                            {quickLinks.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={item.path}
                                        target={item.path.startsWith("http") ? "_blank" : "_self"}
                                    >
                                        <span
                                            className="text-secondary-400 hover:text-accent-500 transition cursor-pointer">
                                            {item.label}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-2 border-t border-secondary-700 pt-4 md:pt-12 md:text-center flex flex-row justify-between">
                    <p className="text-md text-secondary-500">
                        © 2025 Aithereum. All Rights Reserved.
                    </p>
                    <div className="flex space-x-4">
                        <a href="https://t.me/AIthereumprotocol" target="_blank" rel="noopener noreferrer"
                           className="text-secondary-400 hover:text-accent-500 transition">
                            <RiTelegram2Fill size={24}/>
                        </a>
                        <a href="https://x.com/aithereumerc" target="_blank" rel="noopener noreferrer"
                           className="text-secondary-400 hover:text-accent-500 transition">
                            <FaXTwitter size={24}/>
                        </a>
                        <a href="https://medium.com/" target="_blank" rel="noopener noreferrer"
                           className="text-secondary-400 hover:text-accent-500 transition">
                            <FaMedium size={24}/>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;