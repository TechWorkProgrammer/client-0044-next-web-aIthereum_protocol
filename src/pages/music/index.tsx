import React from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import MusicGeneration from "@/components/music/MusicGeneration";

const MusicPage: React.FC = () => {

    return (
        <SidebarLayout>
            <MusicGeneration/>
        </SidebarLayout>
    );
};

export default MusicPage;
