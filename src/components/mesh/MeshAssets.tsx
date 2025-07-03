import React, {useCallback, useEffect, useRef, useState} from "react";
import {useAlert} from "@/context/Alert";
import {MeshData} from "@/types/mesh";
import MeshCard from "@/components/mesh/MeshCard";
import Pagination from "@/components/common/Pagination";
import Loader from "@/components/common/Loader";
import api from "@/utils/axios";

const MeshAssets: React.FC = () => {
    const [meshList, setMeshList] = useState<MeshData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [isLoading, setIsLoading] = useState(true);
    const alert = useAlert();

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await api.get(`/mesh/user`);
            setMeshList(response.data.data);
        } catch (error: any) {
            alert("Opps...", error.response?.data?.message || "Failed to fetch mesh data.", "error");
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

    const sortedMeshList = [...meshList].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMeshes = sortedMeshList.slice(indexOfFirstItem, indexOfLastItem);

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center">
                <Loader size="large"/>
            </div>
        );
    }

    if (!sortedMeshList.length) {
        return (
            <p className="text-white text-center">No mesh assets found. Start generating!</p>
        );
    }

    return (
        <div className="w-full h-full flex flex-col gap-4 relative justify-between">
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {currentMeshes.map((mesh) => (
                        <MeshCard key={mesh.id} mesh={mesh}/>
                    ))}
                </div>
            </div>

            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={sortedMeshList.length}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
            />
        </div>
    );
};

export default MeshAssets;
