import React, {useCallback, useEffect, useRef, useState} from "react";
import {useAlert} from "@/context/Alert";
import Pagination from "@/components/common/Pagination";
import Loader from "@/components/common/Loader";
import api from "@/utils/axios";
import {CodeData} from "@/types/code";
import ProgramListItem from "@/components/program/ProgramListItem";

const MusicAssets: React.FC = () => {
    const [codeList, setCodeList] = useState<CodeData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [isLoading, setIsLoading] = useState(true);
    const alert = useAlert();

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await api.get(`/code/user`);
            setCodeList(response.data.data);
        } catch (error: any) {
            alert(
                "Opps...",
                error.response?.data?.message || "Failed to fetch code data.",
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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCode = codeList.slice(indexOfFirstItem, indexOfLastItem);

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center">
                <Loader size="large"/>
            </div>
        );
    }

    if (!codeList.length) {
        return (
            <p className="text-white text-center">No Code assets found. Start generating!</p>
        );
    }

    return (
        <div className="w-full h-full flex flex-col gap-4 relative justify-between">
            <div className="flex flex-col gap-4 md:px-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {currentCode.map((code) => (
                        <ProgramListItem key={code.id} code={code}/>
                    ))}
                </div>
            </div>

            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={codeList.length}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
            />
        </div>
    );
};

export default MusicAssets;
