import React from "react";
import NFTGeneration from "@/components/nft/NFTGeneration";
import SidebarLayout from "@/components/layout/SidebarLayout";

const NFTPage: React.FC = () => {
    return (
        <SidebarLayout>
            <NFTGeneration/>
        </SidebarLayout>
    );
};

export default NFTPage;
