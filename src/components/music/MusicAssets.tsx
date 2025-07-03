import React, {useEffect, useState, useCallback, useRef} from "react";
import {useAlert} from "@/context/Alert";
import {MusicData} from "@/types/music";
import MusicListItem from "@/components/music/MusicListItem";
import Pagination from "@/components/common/Pagination";
import Loader from "@/components/common/Loader";
import api from "@/utils/axios";

const MusicAssets: React.FC = () => {
    const [musicList, setMusicList] = useState<MusicData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [isLoading, setIsLoading] = useState(true);
    const alert = useAlert();

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await api.get(`/music/user`);
            setMusicList(response.data.data);
        } catch (error: any) {
            alert(
                "Opps...",
                error.response?.data?.message || "Failed to fetch music data.",
                "error"
            );
        } finally {
            setIsLoading(false);
        }
    }, [alert]);

    const assetsFetch = useRef(false);
    useEffect(() => {
        if (assetsFetch.current) return;
        assetsFetch.current = true;
        fetchData().then();
    }, [fetchData]);

    const sortedMusicList = [...musicList].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMusic = sortedMusicList.slice(indexOfFirstItem, indexOfLastItem);

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center">
                <Loader size="large"/>
            </div>
        );
    }

    if (!sortedMusicList.length) {
        return (
            <p className="text-white text-center">No music assets found. Start generating!</p>
        );
    }

    return (
        <div className="w-full h-full flex flex-col gap-4 relative justify-between">
            <div className="flex flex-col gap-4 md:px-2">
                {currentMusic.map((music) => (
                    <MusicListItem key={music.id} music={music}/>
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={sortedMusicList.length}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
            />
        </div>
    );
};

export default MusicAssets;
