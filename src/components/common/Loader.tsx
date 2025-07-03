import React from "react";
import Image from "next/image";

interface LoaderProps {
    size?: "small" | "medium" | "large";
}

const Loader: React.FC<LoaderProps> = ({size = "medium"}) => {
    const sizeClass =
        size === "small"
            ? "w-8 h-8"
            : size === "large"
                ? "w-32 h-32"
                : "w-16 h-16";
    const sizeValue =
        size === "small" ? 48 : size === "large" ? 128 : 72;

    return (
        <div role="status" className={`flex justify-center items-center ${sizeClass}`}>
            <Image
                src="/assets/gif/loader2-transparent.gif"
                alt="Loading..."
                width={sizeValue}
                height={sizeValue}
                priority
                unoptimized
            />
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default Loader;
