import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";
import {io} from "socket.io-client";
import Loader from "@/components/common/Loader";
import MeshViewer from "@/components/mesh/MeshViewer";
import MeshVideo from "@/components/mesh/MeshVideo";
import MeshImage from "@/components/mesh/MeshImage";
import ViewToggle from "@/components/mesh/ViewToggle";
import ColorToggle from "@/components/mesh/ColorToggle";
import MeshDetails from "@/components/mesh/MeshDetails";
import Missing from "@/components/Missing";
import api from "@/utils/axios";

const SOCKET_URL = "wss://api.althereum.techwork.store/";

interface MeshResultProps {
    id?: string;
    embedded?: boolean;
}

const MeshResult: React.FC<MeshResultProps> = ({id, embedded = false}) => {
    const router = useRouter();
    const queryId = router.query.id;
    const finalId = id || (typeof queryId === "string" ? queryId : null);

    const [mesh, setMesh] = useState<any>(null);
    const [viewMode, setViewMode] = useState<"canvas" | "video" | "image">("canvas");
    const [useColor, setUseColor] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isRefining, setIsRefining] = useState(false);
    const [socket, setSocket] = useState<any>(null);

    useEffect(() => {
        const newSocket = io(SOCKET_URL);
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!finalId) return;
        setLoading(true);
        api
            .get(`/mesh/result/${finalId}`)
            .then((response) => setMesh(response.data.data))
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [finalId]);

    useEffect(() => {
        if (!mesh || mesh.taskIdRefine) return;
        if (!finalId) return;

        let active = true;
        const interval = setInterval(() => {
            api.get(`/mesh/result/${finalId}`)
                .then((res) => {
                    if (!active) return;
                    const updatedMesh = res.data.data;
                    setMesh(updatedMesh);
                    if (updatedMesh.taskIdRefine) {
                        clearInterval(interval);
                    }
                })
                .catch(() => {
                });
        }, 5000);

        return () => {
            active = false;
            clearInterval(interval);
        };
    }, [mesh, finalId]);


    useEffect(() => {
        if (!mesh) return;

        const refining = !mesh.refineImage && mesh.taskIdRefine;
        setIsRefining(refining);
        if (refining) setUseColor(false);
        else setUseColor(true);
    }, [mesh]);

    useEffect(() => {
        if (!mesh || !socket || !mesh.taskIdRefine) return;

        const eventName = mesh.taskIdRefine;
        const listener = (data: { status: string; message: string }) => {
            if (data.status === "done" || data.status === "SUCCEEDED") {
                api
                    .get(`/mesh/result/${finalId}`)
                    .then((response) => setMesh(response.data.data))
                    .catch(() => {
                    });
            }
        };

        socket.on(eventName, listener);
        return () => {
            socket.off(eventName, listener);
        };
    }, [mesh, socket, finalId, isRefining]);

    if (loading) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center text-white text-center p-4">
                <Loader size="large"/>
            </div>
        );
    }

    if (error || !finalId) return embedded ? null : <Missing/>;

    if (!mesh) return embedded ? <Loader/> : <Missing/>;

    const modelUrl = useColor ? mesh.modelGlbRefine : mesh.modelGlbPreview;
    const videoUrl = useColor ? mesh.videoRefine : mesh.videoPreview;
    const imageUrl = useColor ? mesh.refineImage : mesh.previewImage;

    const modelLinks = [
        {type: "GLB", previewUrl: mesh.modelGlbPreview, refineUrl: mesh.modelGlbRefine},
        {type: "FBX", previewUrl: mesh.modelFbxPreview, refineUrl: mesh.modelFbxRefine},
        {type: "OBJ", previewUrl: mesh.modelObjPreview, refineUrl: mesh.modelObjRefine},
        {type: "USDZ", previewUrl: mesh.modelUsdzPreview, refineUrl: mesh.modelUsdzRefine},
    ].filter((link) => link.previewUrl || link.refineUrl);

    const createdAt = new Date(mesh.createdAt);
    const version = mesh.aiVersion === "master" ? "V2" : "V1";

    return (
        <div className="w-full flex flex-col items-center relative pt-2 md:pt-0">
            <div
                className={`relative w-full aspect-video bg-primary-800 rounded overflow-hidden shadow-xl ${
                    isRefining ? "" : ""
                } max-h-[70vh]`}
            >
                <div className="absolute bottom-5 right-5 text-center mb-4 font-semibold">
                    <p className="text-lg font-bold bg-accent-400 rounded text-black px-2">{version}</p>
                    {isRefining && (
                        <p className="bg-accent-400 text-black text-xs font-bold px-2 py-1 rounded inline-block mt-1">
                            Refining...
                        </p>
                    )}
                </div>
                <div className="absolute top-4 left-4 flex space-x-3 z-10">
                    {!isRefining && (
                        <ColorToggle useColor={useColor} toggleColor={() => setUseColor((prev) => !prev)}/>
                    )}
                    <ViewToggle
                        viewMode={viewMode}
                        setViewMode={(mode) => {
                            if ((mode === "video" && !videoUrl) || (mode === "image" && !imageUrl)) return;
                            setViewMode(mode);
                        }}
                    />
                </div>

                {viewMode === "canvas" && modelUrl && (<MeshViewer key={modelUrl} modelUrl={modelUrl}/>)}
                {viewMode === "video" && videoUrl && <MeshVideo videoUrl={videoUrl}/>}
                {viewMode === "image" && imageUrl && <MeshImage imageUrl={imageUrl} altText="Mesh Preview"/>}
            </div>

            <MeshDetails
                title={mesh.prompt}
                modelType={mesh.modelType}
                userId={mesh.user?.id}
                username={mesh.user?.username}
                createdAt={createdAt.toLocaleDateString()}
                modelLinks={modelLinks}
                textures={mesh.textures || []}
                taskId={mesh.taskId}
            />
        </div>
    );
};

export default MeshResult;
