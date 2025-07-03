import React from "react";
import ProgramGeneration from "@/components/program/ProgramGeneration";
import SidebarLayout from "@/components/layout/SidebarLayout";

const ProgramPage: React.FC = () => {
    return (
        <SidebarLayout>
            <div className="flex">
                <main className="flex-1 flex flex-col items-start justify-end">
                    <ProgramGeneration/>
                </main>
            </div>
        </SidebarLayout>
    );
};

export default ProgramPage;
