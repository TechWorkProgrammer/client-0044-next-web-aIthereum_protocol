import React from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import DiscoveryComponent from "@/components/discovery/DiscoveryComponent";

const DiscoveryPage: React.FC = () => {
  return (
    <SidebarLayout>
      <div className="rounded-lg flex-1 flex flex-col p-4 md:p-6">
        <div className="flex justify-start mb-4">
          <h2 className="md:text-xl font-semibold">Recomended for you</h2>
        </div>
        <DiscoveryComponent />
      </div>
    </SidebarLayout>
  );
};

export default DiscoveryPage;
