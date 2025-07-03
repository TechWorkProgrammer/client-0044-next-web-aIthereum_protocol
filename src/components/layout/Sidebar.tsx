import React, {useState} from "react";
import {useRouter} from "next/router";
import {FaMedium} from "react-icons/fa6";
import {MdPerson} from "react-icons/md";
import {RiTelegram2Fill} from "react-icons/ri";
import Image from "next/image";
import NotificationModal from "@/components/common/NotificationModal";
import WalletConnectModal from "@/components/common/WalletConnectModal";
import {FaXTwitter} from "react-icons/fa6";
import {useWallet} from "@/context/Wallet";
import {GoBellFill} from "react-icons/go";
import Icon from "@/components/common/Icon";


interface SidebarProps {
    variant: "desktop" | "mobile";
    isMinimized?: boolean;
    toggleOpen?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
                                             variant,
                                             isMinimized = false,
                                             toggleOpen,
                                         }) => {
    const router = useRouter();
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const {connectedWallet} = useWallet();
    const mainNav = [
        {label: "Home", path: "/", icon: <Icon name="home" className="w-5 h-5"/>},
        {label: "Service", path: "/service", icon: <Icon name="service" className="w-5 h-5"/>},
        {label: "Discover", path: "/discover", icon: <Icon name="apps" className="w-5 h-5"/>},
        {label: "My Assets", path: "/assets", icon: <Icon name="assets" className="w-5 h-5"/>},
    ];
    const textNav1 = [
        {label: "Text to 3D", path: "/3d", icon: <Icon name="3d" className="w-5 h-5"/>},
        {label: "Text to Music", path: "/music", icon: <Icon name="music" className="w-5 h-5"/>},
        {label: "Text to Code", path: "/program", icon: <Icon name="code" className="w-5 h-5"/>},
    ];
    const textNav2 = [
        {label: "Text to Metaverse", path: "/metaverse", icon: <Icon name="metaverse" className="w-5 h-5"/>},
        {label: "Text to Game", path: "/game", icon: <Icon name="game" className="w-5 h-5"/>},
        {label: "Text to NFT", path: "/nft", icon: <Icon name="nft" className="w-5 h-5"/>},
    ];
    const allNavGroups = [mainNav, textNav1, textNav2];
    const handleNavigation = (path: string) => {
        router.push(path).then(() => {
            if (variant === "mobile" && toggleOpen) {
                toggleOpen();
            }
        });
    };
    const containerClasses =
        variant === "desktop"
            ? `fixed top-0 left-0 bottom-0 flex flex-col transition-all duration-300 ${
                isMinimized ? "w-20" : "w-64"
            }`
            : `fixed top-0 left-0 bottom-0 w-64 flex flex-col transition-all duration-300 z-20 pt-16`;
    return (
        <>
            <aside
                className={`bg-background-light ${containerClasses}`}
            >
                <div
                    onClick={() => handleNavigation("/")}
                    className="hidden md:flex items-center justify-start px-4 pt-4 cursor-pointer"
                >
                    <div className="relative w-8 h-8">
                        <Image
                            src="/icon.png"
                            alt="CypherAI Logo"
                            fill
                            style={{objectFit: "contain"}}
                            priority
                        />
                    </div>
                    <p className="ml-2 text-white font-semibold text-xl mb-2">CypherAI</p>
                </div>
                <div className="flex-1 overflow-y-auto mt-2">
                    {allNavGroups.map((group, groupIdx) => (
                        <React.Fragment key={groupIdx}>
                            {group.map((item) => (
                                <div key={item.path} className="px-3 py-1">
                                    <button
                                        onClick={() => handleNavigation(item.path)}
                                        className={`flex items-center w-full px-4 py-2 transition rounded font-semibold ${
                                            router.pathname === item.path
                                                ? "bg-accent-500/20 text-white"
                                                : "hover:bg-accent-500/10 text-secondary"
                                        } ${
                                            variant === "desktop" && isMinimized
                                                ? "justify-center"
                                                : ""
                                        }`}
                                    >
                                        {item.icon}
                                        {(variant === "mobile" || !isMinimized) && (
                                            <span className="ml-3">{item.label}</span>
                                        )}
                                    </button>
                                </div>
                            ))}
                            {groupIdx < allNavGroups.length - 1 && (
                                <div className="border-t border-secondary-500 my-2"/>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                <div className="border-t border-secondary-500 px-2 py-2 flex flex-col gap-2 font-semibold text-md">
                    {connectedWallet && (
                        <button
                            onClick={() => setIsNotifOpen(true)}
                            className="flex items-center w-full px-4 py-2 transition hover:bg-accent-500/10 text-secondary rounded"
                        >
                            <GoBellFill size={18}/>
                            <span className="ml-3">Notification</span>
                        </button>
                    )}
                    <button
                        onClick={() => setIsProfileOpen(true)}
                        className="flex items-center w-full px-4 py-2 transition hover:bg-accent-500/10 text-secondary rounded"
                    >
                        <MdPerson size={18}/>
                        <span className="ml-3">
                          {connectedWallet ? "Your Profile" : "Connect Wallet"}
                        </span>
                    </button>
                </div>
                <div className="border-t border-secondary-500">
                    <div className="flex space-x-4 w-full justify-between px-4 md:px-6 py-6">
                        <a href="https://t.me/" target="_blank" rel="noopener noreferrer"
                           className="text-secondary-900 hover:text-accent-500 transition bg-primary-800 rounded p-3">
                            <RiTelegram2Fill size={24}/>
                        </a>
                        <a href="https://x.com/cypheraieth" target="_blank" rel="noopener noreferrer"
                           className="text-secondary-900 hover:text-accent-500 transition bg-primary-800 rounded p-3">
                            <FaXTwitter size={24}/>
                        </a>
                        <a href="https://medium.com/" target="_blank" rel="noopener noreferrer"
                           className="text-secondary-900 hover:text-accent-500 transition bg-primary-800 rounded p-3">
                            <FaMedium size={24}/>
                        </a>
                    </div>
                </div>
            </aside>
            <NotificationModal isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)}/>
            <WalletConnectModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)}/>
        </>
    );
};

export default Sidebar;
