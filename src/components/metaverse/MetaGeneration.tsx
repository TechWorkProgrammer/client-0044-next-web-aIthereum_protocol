import React, {useState} from "react";
import {FaPaperPlane} from "react-icons/fa";
import {useAlert} from "@/context/Alert";
import MetaExampleComponent from "@/components/metaverse/MetaExampleComponent";
import Button from "@/components/common/Button";

const MetaGeneration: React.FC = () => {
    const [prompt, setPrompt] = useState("Simple Metaverse Modern City Map");
    const alert = useAlert();

    const handleGenerate = () => {
        alert("Coming Soon", "This feature isn't ready yet. Stay tuned.", "info");
    };

    return (
        <div className="text-white w-full">
            <div className="flex w-full">
                <div
                    className="w-[200px] md:w-[280px] lg:w-[320px] flex flex-col bg-background-light h-[calc(100vh-4rem)] md:h-screen border-x border-secondary-200">
                    <div className="w-full h-full flex flex-col justify-between">
                        <div>
                            <h2 className="md:text-xl font-semibold p-4 border-b border-secondary-200">
                                Metaverse Generation
                            </h2>
                            <div className="p-4">
                                <h2 className="md:text-xl font-semibold mb-2">Prompt</h2>
                                <textarea
                                    name="prompt"
                                    placeholder="Describe the world you want to create..."
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    className="w-full bg-primary-700 text-white placeholder-secondary-400 border border-secondary-200 rounded p-4 resize-none focus:outline-none focus:ring-1 focus:ring-accent-500"
                                    rows={6}
                                />
                            </div>
                        </div>
                        <div className="p-4">
                            <Button
                                onClick={handleGenerate}
                                color="primary"
                                icon={<FaPaperPlane/>}
                                label="Generate"
                                fullWidth={true}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col p-4 md:p-6 w-full">
                    <div className="rounded-lg flex-1 flex flex-col">
                        <div className="flex justify-start mb-4">
                            <Button
                                onClick={() => alert("Coming soon", "This feature isn't ready yet. Stay tuned.", "info")}
                                color="primary"
                                label="Open My Assets"
                            />
                        </div>
                        <div className="flex items-center w-full mb-4">
                            <h3 className="md:text-xl font-semibold whitespace-nowrap mr-4">Generation Result</h3>
                        </div>
                        <div className="w-full rounded-lg min-h-[70vh]">
                            <MetaExampleComponent/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MetaGeneration;
