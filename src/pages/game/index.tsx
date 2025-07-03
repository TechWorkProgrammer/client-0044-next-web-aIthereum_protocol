import React from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import ComingSoon from "@/components/ComingSoon";

const GamePage: React.FC = () => {
    return (
        <SidebarLayout>
            <ComingSoon />
        </SidebarLayout>
    );
};

export default GamePage;
