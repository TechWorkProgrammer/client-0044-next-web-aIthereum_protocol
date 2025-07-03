import React from "react";
import {useWallet} from "@/context/Wallet";
import ProtectedPage from "@/components/ProtectedPage";
import SidebarLayout from "@/components/layout/SidebarLayout";
import AssetsNavigation from "@/components/assets/AssetsNavigation";
import ProgramAssets from "@/components/program/ProgramAssets";

const CodeAssetsPage: React.FC = () => {
    const {connectedWallet} = useWallet();

    return (
        <SidebarLayout>
            {connectedWallet ?
                <div className="rounded-lg flex-1 flex flex-col p-4 md:p-6">
                    <div className="flex justify-start mb-4">
                        <h2 className="md:text-xl font-semibold">My Assets</h2>
                    </div>
                    <div className="w-full">
                        <AssetsNavigation activeCategory="code"/>
                        <ProgramAssets/>
                    </div>
                </div> : <div className="rounded-lg flex-1 flex flex-col p-4 md:p-6"><ProtectedPage/></div>
            }
        </SidebarLayout>
    );
};

export default CodeAssetsPage;
