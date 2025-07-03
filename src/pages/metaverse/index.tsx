import React from "react";
import MetaGeneration from "@/components/metaverse/MetaGeneration";
import SidebarLayout from "@/components/layout/SidebarLayout";

const MetaversePage: React.FC = () => {
    return (
        <SidebarLayout>
            <MetaGeneration/>
        </SidebarLayout>
    );
};

export default MetaversePage;
