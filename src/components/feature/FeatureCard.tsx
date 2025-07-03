import React from "react";
import {useRouter} from "next/router";
import Image from "next/image";
import Button from "@/components/common/Button";
import {motion} from "framer-motion";

interface FeatureCardProps {
    title: string;
    path: string;
    image: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({title, path, image, description}) => {
    const router = useRouter();

    return (
        <motion.div
            className="group w-full relative h-52 md:h-72 rounded-md border-2 border-accent-400 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: false}}
            transition={{duration: 0.6, ease: "easeOut"}}
        >
            <Image
                src={image}
                alt={title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300 rounded-xl"/>

            <div
                className="absolute bottom-0 left-0 w-full bg-primary-900/90 p-2 text-white rounded-b-xl border-t-2 border-accent-400">
                <h3 className="text-sm md:text-xl font-bold mb-2 group-hover:text-accent-400 transition-colors duration-300 px-2">
                    {title}
                </h3>
                <p className="text-xs md:text-sm text-secondary-700 mb-4 leading-snug px-2">{description}</p>
                <Button
                    label="Try Now"
                    onClick={() => router.push(path)}
                    color="primary"
                    fullWidth
                />
            </div>
        </motion.div>
    );
};

export default FeatureCard;
