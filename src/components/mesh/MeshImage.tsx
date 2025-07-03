import React from "react";
import Image from "next/image";

type MeshImageProps = {
    imageUrl: string;
    altText: string;
};

const MeshImage: React.FC<MeshImageProps> = ({imageUrl, altText}) => {
    return (
        <Image
            src={imageUrl}
            alt={altText}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
        />
    );
};

export default MeshImage;
