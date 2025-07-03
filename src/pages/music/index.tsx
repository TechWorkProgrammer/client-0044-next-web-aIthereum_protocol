import React from "react";
import MusicGeneration from "@/components/music/MusicGeneration";
import SidebarLayout from "@/components/layout/SidebarLayout";

const MusicPage: React.FC = () => {

    return (
        <SidebarLayout>
            <MusicGeneration/>
        </SidebarLayout>
    );
};

export default MusicPage;
