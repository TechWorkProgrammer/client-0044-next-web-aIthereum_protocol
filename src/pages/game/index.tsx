import React from "react";
import GameGeneration from "@/components/game/GameGeneration";
import SidebarLayout from "@/components/layout/SidebarLayout";

const GamePage: React.FC = () => {
    return (
        <SidebarLayout>
            <GameGeneration/>
        </SidebarLayout>
    );
};

export default GamePage;
