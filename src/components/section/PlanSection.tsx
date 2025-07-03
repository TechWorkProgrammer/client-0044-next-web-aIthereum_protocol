import React from "react";
import {motion} from "framer-motion";
import {FaCheck} from "react-icons/fa";
import Button from "@/components/common/Button";

const plans = [
    {
        title: "30 Days Free Plan",
        price: "$0",
        description: "every features to start with",
        features: [
            {
                title: "3D Generation",
                description: "Access to generate stunning 3D models with an interactive 3D Canvas."
            },
            {title: "Music Generation", description: "Access to create unique tracks with a built-in Media Player."},
            {title: "Code Generation", description: "Access to generate code with live preview & editor features."},
            {title: "NFT Generation", description: "Access to generate digital assets for NFT collections."},
            {
                title: "Metaverse Generation",
                description: "Access to create immersive assets for Metaverse experiences."
            },
            {title: "Game Generation", description: "Access to develop game-ready content from simple text prompts."},
        ],
        buttonLabel: "Get Started",
    },
];

const PlanSection = () => {
    return (
        <motion.section
            className="relative flex flex-col items-center justify-center min-h-screen text-white py-16 px-4 "
            id="pricing"
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: false}}
            transition={{duration: 1}}
        >
            <div className="absolute inset-0"></div>
            <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4 text-white text-center z-10"
                initial={{y: -50, opacity: 0}}
                whileInView={{y: 0, opacity: 1}}
                viewport={{once: false}}
                transition={{duration: 0.8}}
            >
                Pricing
            </motion.h1>
            <motion.h5
                className="text-xl font-bold mb-12 text-secondary-600 text-center z-10"
                initial={{y: -50, opacity: 0}}
                whileInView={{y: 0, opacity: 1}}
                viewport={{once: false}}
                transition={{duration: 0.8}}
            >
                Access AI cutting-edge tool - First 30 Days Are Free
            </motion.h5>
            <div className="flex flex-wrap justify-center gap-8 w-full z-10">
                {plans.map((plan, index) => (
                    <motion.div
                        key={index}
                        className="border border-accent-500 p-8 rounded-3xl shadow-xl hover:scale-105 transform transition duration-300"
                        initial={{scale: 0.8, opacity: 0}}
                        whileInView={{scale: 1, opacity: 1}}
                        viewport={{once: false}}
                        transition={{duration: 0.8, delay: index * 0.2}}
                    >
                        <div className="text-start mb-6">
                            <h2 className="text-2xl font-bold text-white">{plan.title}</h2>
                            <h3 className="text-4xl font-bold mt-2 text-white">{plan.price}<span
                                className="text-lg text-secondary-600">/month</span></h3>
                            <h3 className="text-lg font-bold mt-2 text-secondary-600">{plan.description}</h3>
                        </div>

                        <div className="w-full my-6">
                            <Button
                                label={plan.buttonLabel}
                                onClick={() => {
                                }}
                                color="primary"
                                fullWidth={true}
                            />
                        </div>

                        <ul className="space-y-4">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex gap-3 items-start">
                                    <FaCheck className="text-white mt-1"/>
                                    <div>
                                        <p className="text-lg font-semibold text-accent-300">{feature.title}</p>
                                        <p className="text-sm text-secondary-300">{feature.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default PlanSection;
