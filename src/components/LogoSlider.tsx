import React from "react";
import {motion} from "framer-motion";
import Image from "next/image";

const productImages = [
    "/assets/product/1.png",
    "/assets/product/2.png",
    "/assets/product/3.png",
    "/assets/product/4.png",
    "/assets/product/5.png",
    "/assets/product/6.png",
    "/assets/product/7.png",
    "/assets/product/8.png",
    "/assets/product/9.png",
    "/assets/product/10.png",
    "/assets/product/11.png",
    "/assets/product/12.png",
    "/assets/product/13.png",
    "/assets/product/14.png",
    "/assets/product/15.png",
    "/assets/product/16.png",
    "/assets/product/17.png",
    "/assets/product/18.png",
    "/assets/product/19.png",
    "/assets/product/20.png",
];

interface LogoSliderProps {
    speed?: number;
    direction?: "left" | "right";
    imageWidth?: number;
    imageHeight?: number;
    gap?: number;
}

const LogoSlider: React.FC<LogoSliderProps> = ({
                                                   speed = 80,
                                                   direction = "left",
                                                   imageWidth = 200,
                                                   imageHeight = 75,
                                                   gap = 16,
                                               }) => {
    const totalWidth = productImages.length * (imageWidth + gap);
    const duration = totalWidth / speed;
    const animationDirection = direction === "right" ? "reverse" : "normal";

    return (
        <motion.section
            id="product"
            className="flex w-full bg-background-dark overflow-hidden items-center justify-center"
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: false}}
            transition={{duration: 0.8}}
        >
            <div className="overflow-hidden w-full">
                <div
                    className="flex flex-nowrap animate-scroll"
                    style={
                        {
                            "--totalWidth": `${totalWidth}px`,
                            "--duration": `${duration}s`,
                            "--animationDirection": animationDirection,
                        } as React.CSSProperties
                    }
                >
                    {[
                        ...productImages,
                        ...productImages,
                    ].map((src, index) => (
                        <div
                            key={`logo-slider-${index}`}
                            className="relative flex-shrink-0"
                            style={{
                                width: `${imageWidth}px`,
                                height: `${imageHeight}px`,
                                marginRight: `${gap}px`,
                            }}
                        >
                            <Image
                                src={src}
                                alt={`Logo ${index % productImages.length + 1}`}
                                fill
                                sizes={`${imageWidth}px`}
                                style={{
                                    objectFit: "cover",
                                    filter: "invert(1)",
                                }}
                                priority
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/assets/icon.png";
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(calc(-1 * var(--totalWidth)));
                    }
                }

                .animate-scroll {
                    animation: scroll var(--duration) linear infinite var(--animationDirection);
                }
            `}</style>
        </motion.section>
    );
};

export default LogoSlider;
