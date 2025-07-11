import React from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import {useRouter} from "next/router";
import Button from "@/components/common/Button";
import {RiTokenSwapLine} from "react-icons/ri";
import MusicResult from "@/components/music/MusicResult";

const MusicResultPage: React.FC = () => {
    const router = useRouter();
    return (
        <SidebarLayout>
            <div className="rounded-lg flex-1 flex flex-col p-4 md:p-6">
                <div className="flex justify-start mb-4">
                    <Button
                        onClick={() => router.push("/assets/music")}
                        color="primary"
                        icon={<RiTokenSwapLine size={18}/>}
                        label="Open My Assets"
                    />
                </div>
                <MusicResult/>
            </div>
        </SidebarLayout>
    );
};

export default MusicResultPage;
