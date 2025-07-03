import React from "react";
import {motion} from "framer-motion";
import Button from "@/components/common/Button";
import Image from "next/image";
import {FaMagic} from "react-icons/fa";
import {useRouter} from "next/router";

const StudioSection = () => {
    const router = useRouter();

    return (
        <motion.section
            id="studio"
            className="relative flex flex-col lg:flex-row items-center justify-center lg:justify-between text-white min-h-[40vh] lg:min-h-[95vh] px-6 py-12 lg:py-24 gap-8"
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
            transition={{duration: 1}}
        >
            <div className="absolute inset-0 z-0"></div>

            <div className="flex flex-col gap-1 items-center lg:items-start lg:w-1/2 text-center lg:text-left z-10">
                <motion.h1
                    className="text-2xl sm:text-4xl lg:text-6xl font-extrabold bg-clip-text text-white pt-12"
                    initial={{y: -50, opacity: 0}}
                    whileInView={{y: 0, opacity: 1}}
                    viewport={{once: false}}
                    transition={{duration: 0.8}}
                >
                    Revolutionize 3D Production
                </motion.h1>
                <motion.h1
                    className="text-2xl sm:text-4xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-accent-500 via-accent-400 to-accent-600"
                    initial={{y: -50, opacity: 0}}
                    whileInView={{y: 0, opacity: 1}}
                    viewport={{once: false}}
                    transition={{duration: 0.8}}
                >
                    and Authorship
                </motion.h1>
                <motion.p
                    className="text-md sm:text-lg lg:text-2xl text-secondary-800 leading-relaxed max-w-xl mb-4"
                    initial={{y: 50, opacity: 0}}
                    whileInView={{y: 0, opacity: 1}}
                    viewport={{once: false}}
                    transition={{duration: 0.8, delay: 0.2}}
                >
                    CypherAl is reinventing how 3D assets are generated, shared, and owned. We provide a platform that
                    allows creators to express their creativity, exhibit their work, and make value by converting their
                    works into NFTs. This can be done with the help of boundless artificial intelligence and blockchain
                    technology.
                </motion.p>
                <motion.div
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    viewport={{once: false}}
                    transition={{duration: 0.8, delay: 0.4}}
                >
                    <Button
                        label="Generate Now"
                        onClick={() => router.push("/service")}
                        color="primary"
                        icon={<FaMagic/>}
                    />
                </motion.div>
            </div>

            <div className="relative lg:w-1/2 flex justify-center items-center w-full h-auto z-10">
                <motion.div
                    className="relative w-full max-w-xl md:max-w-2xl aspect-[3/4] overflow-hidden transform rotate-3 scale-105 border rounded-3xl border-accent-500"
                    initial={{opacity: 0, scale: 0.9}}
                    whileInView={{opacity: 1, scale: 1}}
                    viewport={{once: false}}
                    transition={{duration: 0.8}}
                >
                    <Image
                        src="/assets/images/studio.webp"
                        alt="3D Creation"
                        fill
                        className="object-cover w-full h-full"
                        priority
                    />
                </motion.div>
            </div>
        </motion.section>
    );
};

export default StudioSection;
