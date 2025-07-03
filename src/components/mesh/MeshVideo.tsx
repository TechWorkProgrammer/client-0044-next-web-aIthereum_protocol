import React, { useRef } from "react";

type MeshVideoProps = {
    videoUrl: string;
};

const MeshVideo: React.FC<MeshVideoProps> = ({ videoUrl }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            onMouseDown={() => videoRef.current?.pause()}
            onMouseUp={() => videoRef.current?.play()}
            onTouchStart={() => videoRef.current?.pause()}
            onTouchEnd={() => videoRef.current?.play()}
        />
    );
};

export default MeshVideo;
