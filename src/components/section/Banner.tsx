import React from "react";
import {motion} from "framer-motion";
import Image from "next/image";
import {FiCopy} from "react-icons/fi";
import {useAlert} from "@/context/Alert";

const CONTRACT_ADDRESS = "0xde85c622fb3488851520d721f3ebf052a29ae333";

const Banner: React.FC = () => {
    const alert = useAlert();
    const copyToClipboard = () => {
        navigator.clipboard.writeText(CONTRACT_ADDRESS).then(() => alert("Success", "Address copied on your clipboard", "info"));
    };
    return (
        <section
            id="about"
            className="relative pt-24 lg:pt-44 flex flex-col items-center justify-start overflow-hidden bg-transparent"
        >
            <motion.div
                className="relative z-10 flex flex-col items-center mx-auto"
                initial={{opacity: 0, y: -50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1, ease: "easeOut"}}
            >
                <div className="w-full lg:w-1/2 text-center space-y-2 md:space-y-6 px-2 md:px-6">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center drop-shadow-lg mb-2">
                        Unlock Your Full Potential
                    </h1>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center drop-shadow-lg mb-10">
                        with{" "}
                        <span className="bg-gradient-to-r from-accent-600 to-accent-400 bg-clip-text text-transparent">
                          Aithereum
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-secondary-900 px-4 md:px-8">
                        Aithereum helps bring your ideas to life. Use artificial
                        intelligence to its fullest to help automate, innovate, and elevate
                        your business to the next level.
                    </p>
                </div>
                <div className="relative flex justify-center items-center w-full h-auto z-10">
                    <motion.div
                        className="relative w-full max-w-7xl aspect-[20/9] overflow-hidden transform rotate-3"
                        initial={{opacity: 0, scale: 0.9}}
                        whileInView={{opacity: 1, scale: 1}}
                        viewport={{once: false}}
                        transition={{duration: 0.8}}
                    >
                        <Image
                            src="/assets/images/aithereum-splash.png"
                            alt="Aithereum Splash"
                            width={4572}
                            height={1500}
                            priority
                        />
                    </motion.div>
                </div>
                <div className="mt-6 mb-12 flex flex-col items-center space-y-4">
                    <p className="text-xl md:text-2xl lg:text-4xl text-secondary-900 px-4 md:px-8">
                        Aithereum contract address ERC-20
                    </p>
                    <div className="flex items-center border-2 border-accent-400 rounded px-4 py-2">
                        <code className="font-mono text-lg text-white select-all">
                            {CONTRACT_ADDRESS}
                        </code>
                        <button
                            onClick={copyToClipboard}
                            className="ml-3 text-accent-400 hover:text-accent-300 focus:outline-none"
                            aria-label="Copy contract address"
                        >
                            <FiCopy className="text-accent-400 hover:text-accent-300" size={20}/>
                        </button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Banner;
