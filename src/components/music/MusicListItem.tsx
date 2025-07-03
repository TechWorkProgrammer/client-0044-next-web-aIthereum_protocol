import React from "react";
import Image from "next/image";
import {MusicData} from "@/types/music";
import {AiFillPlayCircle, AiOutlineAudio} from "react-icons/ai";

interface MusicListItemProps {
    music: MusicData;
}

const MusicListItem: React.FC<MusicListItemProps> = ({music}) => {
    const createdAt = new Date(music.createdAt).toLocaleDateString();
    const imageUrl = music.imageUrl;

    return (
        <div
            className="flex items-center bg-primary-800 py-2 px-4 rounded shadow-md hover:bg-primary-700 transition group cursor-pointer border md:border-2 border-accent-400"
            onClick={() => (window.location.href = `/music/${music.taskId}`)}
        >
            <div
                className="relative w-20 h-20 bg-primary-500 rounded overflow-hidden flex items-center justify-center">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={music.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                        className="object-cover border border-accent-400 rounded"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-secondary-300">
                        <AiOutlineAudio className="w-8 h-8"/>
                        <span className="text-xs mt-1">No Image</span>
                    </div>
                )}

                <button
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                    onClick={() => (window.location.href = `/music/${music.taskId}`)}
                >
                    <AiFillPlayCircle className="w-8 h-8 text-white"/>
                </button>
            </div>

            <div className="flex-1 ml-4">
                <h3 className="text-lg font-semibold text-white">{music.title}</h3>
                <p className="text-sm text-secondary-400">Played {music.totalView} times</p>
                <p className="text-xs text-secondary-500">Release on {createdAt}</p>

                {music.tags && (
                    <div className="mt-1 flex flex-wrap gap-2">
                        {music.tags.split(",").map((tag, index) => (
                            <span
                                key={index}
                                className="text-xs px-2 py-1 bg-primary-600 rounded-md text-secondary-900"
                            >
                                {tag.trim()}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MusicListItem;
