import React from "react";
import Image from "next/image";

const promptText = "Futuristic 3D female character with glowing cyan elements in a cyber world.";
const imageSrc = "/assets/images/prompt-example.webp";

const PromptExample: React.FC = () => {
    return (
        <div className="w-full flex justify-center">
            <div className="relative w-full flex justify-center items-center">
                <div className="absolute -left-2 md:-left-5 lg:-left-20 top-0 bottom-0 w-[100vw]">
                    <Image
                        src="/assets/images/prompt-splash-left.webp"
                        alt="Left Light Decoration"
                        fill
                        style={{objectFit: "contain", objectPosition: "left"}}
                        priority
                    />
                </div>

                <div className="absolute -right-2 md:-right-5 lg:-right-20 top-0 bottom-0 w-[100vw]">
                    <Image
                        src="/assets/images/prompt-splash-right.webp"
                        alt="Right Decoration"
                        fill
                        style={{objectFit: "contain", objectPosition: "right"}}
                        priority
                    />
                </div>

                <div
                    className="relative w-[90vw] md:w-[95vw] aspect-[20/9] border-2 border-accent-400 rounded-xl overflow-hidden shadow-lg mx-auto">
                    <Image
                        src={imageSrc}
                        alt="Generated Example"
                        width={4428}
                        height={2744}
                        style={{objectFit: "cover", objectPosition: "center"}}
                        priority
                    />

                    <div
                        className="absolute bottom-0 w-full mx-auto px-4 py-3 rounded-lg shadow-xl text-center"
                    >
                        <p className="font-bold mb-1 text-sm md:text-xl lg:text-2xl">
                            Prompt
                        </p>
                        <p className="font-semibold text-xs md:text-lg lg:text-xl">
                            {promptText}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromptExample;
