import React, {useState} from "react";
import {FaPowerOff, FaSyncAlt} from "react-icons/fa";
import Image from "next/image";
import api from "@/utils/axios";
import {saveUser, getUser, getAccessToken, clearUser} from "@/utils/user";
import {FiEdit} from "react-icons/fi";
import {PiCopySimpleBold} from "react-icons/pi";

interface LoggedInComponentProps {
    user: ReturnType<typeof getUser>;
    disconnectWallet: () => void;
    alert: (title: string, message: string, type: "success" | "error" | "info") => void;
    loader: (state: boolean) => void;
}

const walletIconMap: Record<string, string> = {
    MetaMask: "/assets/wallets/metamask.png",
    WalletConnect: "/assets/wallets/walletconnect.png",
    CypherAI: "/icon.png",
};

const LoggedInComponent: React.FC<LoggedInComponentProps> = ({
                                                                 user,
                                                                 disconnectWallet,
                                                                 alert,
                                                                 loader,
                                                             }) => {
    const [username, setUsername] = useState<string>(user?.username || "");
    const [editMode, setEditMode] = useState(false);

    const truncatedAddress = user?.address
        ? `${user.address.slice(0, 5)}...${user.address.slice(-4)}`
        : "Unknown Address";

    const walletIconSrc = walletIconMap[user?.walletType || ""] || "/assets/wallets/default.png";

    const refreshUserData = async () => {
        loader(true);
        try {
            const token = getAccessToken();
            if (!token) {
                alert(
                    "Authentication Required",
                    "No valid session found. Please connect your wallet again.",
                    "error"
                );
                clearUser();
                return;
            }
            const response = await api.get(`/user/me`);
            const updated = response.data.data;
            saveUser({
                id: user?.id || "unknown",
                username: updated?.username || user?.username || "",
                address: user?.address || "",
                point: updated?.point || user?.point || 0,
                accessToken: user?.accessToken || "",
                refreshToken: user?.refreshToken || "",
                walletType: user?.walletType || "unknown",
            });
            alert("Data Refreshed", "Your account information has been updated.", "success");
        } catch (err: any) {
            alert("Refresh Failed", err.message || "Unable to update user data.", "error");
        } finally {
            loader(false);
        }
    };

    const handleUpdateUsername = async () => {
        if (!username || username.length < 4 || username.length > 20) {
            alert(
                "Invalid Username",
                "Username must be between 4 and 20 characters long.",
                "error"
            );
            return;
        }
        loader(true);
        try {
            const token = getAccessToken();
            if (!token) {
                alert(
                    "Authentication Required",
                    "No valid session found. Please connect your wallet again.",
                    "error"
                );
                clearUser();
                return;
            }
            await api.put(`/user/username`, {username});
            saveUser({
                id: user?.id || "unknown",
                username,
                address: user?.address || "",
                point: user?.point || 0,
                accessToken: user?.accessToken || "",
                refreshToken: user?.refreshToken || "",
                walletType: user?.walletType || "unknown",
            });
            setEditMode(false);
            alert("Username Updated", "Your display name has been changed.", "success");
        } catch (err: any) {
            alert("Update Failed", err.message || "Unable to change username.", "error");
        } finally {
            loader(false);
        }
    };

    const handleCopyAddress = () => {
        if (user?.address) {
            navigator.clipboard.writeText(user.address).then(() => {
                alert("Copied to Clipboard", "Wallet address has been copied.", "success");
            });
        }
    };

    return (
        <div className="w-full p-4 min-w-[20rem] xl:min-w-[28rem]">
            <div className="flex flex-col items-start justify-start w-full">
                <div className="flex items-center w-full space-x-3">
                    <div className="relative">
                        <Image
                            src="/assets/images/avatar.png"
                            alt="Profile Avatar"
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-full"
                        />
                        <div
                            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-accent-300 p-[2px] flex justify-center items-center shadow">
                            <Image
                                src={walletIconSrc}
                                alt={user?.walletType || "Wallet"}
                                width={20}
                                height={20}
                                className="object-contain"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col flex-1">
                        <div className="flex items-center space-x-2">
                            <div className="relative inline-flex items-center">
                                <input
                                    type="text"
                                    value={username}
                                    disabled={!editMode}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="bg-transparent border-none focus:outline-none text-white text-base md:text-lg font-semibold disabled:cursor-default"
                                    style={{
                                        width: `${Math.max(username.length, 1)}ch`,
                                    }}
                                />
                                {!editMode && (
                                    <FiEdit
                                        onClick={() => setEditMode(true)}
                                        className="ml-1 text-gray-400 cursor-pointer hover:text-white"
                                    />
                                )}
                            </div>

                            {editMode && (
                                <>
                                    <button
                                        onClick={handleUpdateUsername}
                                        className="text-accent-400 font-semibold"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => {
                                            setUsername(user?.username || '');
                                            setEditMode(false);
                                        }}
                                        className="text-gray-400 font-semibold"
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <p className="text-gray-400">{truncatedAddress}</p>
                            <PiCopySimpleBold
                                onClick={handleCopyAddress}
                                className="text-gray-400 cursor-pointer hover:text-white"
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full border border-secondary-200 rounded-md px-4 py-2 flex items-center justify-between my-6">
                    <p className="text-white/70 text-base">CypherAI Points</p>
                    <p className="text-white text-base font-semibold">{user?.point || 0}</p>
                </div>

                <div className="flex w-full gap-2">
                    <button
                        onClick={refreshUserData}
                        className="w-1/2 flex items-center justify-center gap-2 bg-accent-400 text-black text-lg font-semibold py-2 rounded transition"
                    >
                        <FaSyncAlt/>
                        Refresh
                    </button>

                    <button
                        onClick={disconnectWallet}
                        className="w-1/2 flex items-center justify-center gap-2 bg-red-600/20 text-red-600 text-lg font-semibold py-2 rounded transition"
                    >
                        <FaPowerOff/>
                        Disconnect
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoggedInComponent;
