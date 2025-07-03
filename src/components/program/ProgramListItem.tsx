import React from "react";
import {CodeData} from "@/types/code";

interface ProgramListItemProps {
    code: CodeData;
}

const ProgramListItem: React.FC<ProgramListItemProps> = ({code}) => {
    const createdAt = new Date(code.createdAt).toLocaleDateString();

    return (
        <div
            className="flex items-center bg-primary-800 py-2 px-4 rounded shadow-md hover:bg-primary-700 transition group cursor-pointer border md:border-2 border-accent-400"
            onClick={() => (window.location.href = `/program/${code.id}`)}
        >
            <div className="flex flex-col min-h-[120px] justify-between">
                <h3 className="text-lg font-semibold text-white">{code.prompt}</h3>
                <p className="text-xs text-secondary-500">Created on {createdAt}</p>
            </div>
        </div>
    );
};

export default ProgramListItem;
