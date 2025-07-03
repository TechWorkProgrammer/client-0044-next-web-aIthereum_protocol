import React from "react";
import ThreeDGeneration from "@/components/mesh/ThreeDGeneration";
import SidebarLayout from "@/components/layout/SidebarLayout";

const ThreeDPage: React.FC = () => {
    return (
        <SidebarLayout>
            <ThreeDGeneration/>
        </SidebarLayout>
    );
};

export default ThreeDPage;
