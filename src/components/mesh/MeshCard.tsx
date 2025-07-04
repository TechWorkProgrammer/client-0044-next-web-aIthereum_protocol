import React, {useState} from "react";
import Image from "next/image";
import {MeshData} from "@/types/mesh";
import {AiOutlineHeart, AiFillHeart, AiOutlineShareAlt} from "react-icons/ai";
import {useAlert} from "@/context/Alert";

interface MeshCardProps {
    mesh: MeshData;
}

const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const MeshCard: React.FC<MeshCardProps> = ({mesh}) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const alert = useAlert();

    const imageUrl = mesh.refineImage || mesh.previewImage;
    const taskId = mesh.taskIdRefine || mesh.taskIdPreview;
    const createdAt = new Date(mesh.createdAt);
    const createdAtFormatted = createdAt.toLocaleDateString();
    const shareLink = `${window.location.origin}/3d/${taskId}`;

    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(shareLink).then(() => {
            alert("Link copied to clipboard!", "success");
        });
    };

    // const getVersionTag = (aiVersion: string) => {
    //     if (aiVersion.toLowerCase() === "meshy") return "v1";
    //     if (aiVersion.toLowerCase() === "master") return "v2";
    //     return "";
    // };

    const isRefining = () => {
        const now = new Date();
        const timeDiffInHours = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
        return mesh.taskIdRefine && !mesh.refineImage && timeDiffInHours < 2;
    };

    return (
        <div
            className="relative cursor-pointer bg-primary-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-xl group border md:border-2 border-accent-400"
            onClick={() => (window.location.href = `/3d/${taskId}`)}
        >
            <div className="relative w-full h-40 flex items-center justify-center bg-primary-700">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={mesh.prompt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        style={{objectFit: "contain"}}
                        priority
                        className="rounded-t-lg"
                    />
                ) : (
                    <span className="text-secondary-400 text-sm">Preview Not Ready</span>
                )}

                <div
                    className="absolute top-2 right-2 flex gap-2 rounded-lg backdrop-blur-md opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        className="w-8 h-8 flex items-center justify-center rounded-md shadow-md bg-primary-500 hover:bg-accent-600 transition"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsFavorite(!isFavorite);
                        }}
                    >
                        {isFavorite ? (
                            <AiFillHeart className="w-4 h-4 text-red-500"/>
                        ) : (
                            <AiOutlineHeart className="w-4 h-4 text-white"/>
                        )}
                    </button>

                    <button
                        className="w-8 h-8 flex items-center justify-center rounded-md shadow-md bg-primary-500 hover:bg-accent-600 transition"
                        onClick={handleShare}
                    >
                        <AiOutlineShareAlt className="w-4 h-4 text-white"/>
                    </button>
                </div>

                {isRefining() && (
                    <div
                        className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded shadow-md">
                        Refining...
                    </div>
                )}
            </div>

            <div className="p-4 space-y-2 border-t border-accent-400">
                <h3 className="text-lg font-bold text-white">{truncateText(mesh.prompt, 24)}</h3>
                <div className="flex justify-between items-center text-secondary-500 text-xs">
                    <span className="text-secondary-400">{mesh.user?.username || ""}</span>
                    <span className="text-secondary-400">{createdAtFormatted}</span>
                </div>
            </div>
        </div>
    );
};

export default MeshCard;
