import React, {useState} from "react";
import Button from "@/components/common/Button";
import {useAlert} from "@/context/Alert";
import {
    FaRegPaperPlane,
} from "react-icons/fa";
import {getAccessToken} from "@/utils/user";
import api from "@/utils/axios";
import Loader from "@/components/common/Loader";
import {CodeData} from "@/types/code";
import ProgramResult from "@/components/program/ProgramResult";

const ProgramGeneration: React.FC = () => {
    const [prompt, setPrompt] = useState("");
    const [code, setCode] = useState<CodeData | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const alert = useAlert();

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            alert("We can handle your prompt", "Please enter a prompt first to generate code.", "error");
            return;
        }
        const token = getAccessToken();
        if (!token) {
            alert("Opps...", "You need login to generate code, Please log in.", "error");
            return;
        }

        try {
            setIsLoading(true);
            const res = await api.post(`/code/generate`, {
                prompt: prompt.trim(),
            });
            setCode(res.data.data);
        } catch (err: any) {
            alert("Opps...", err.response?.data?.message || "Failed to generate code. Try again later", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="text-white w-full">
            <div className="flex w-full">
                <div
                    className="w-[200px] md:w-[280px] lg:w-[320px] flex flex-col bg-background-light h-[calc(100vh-4rem)] lg:h-screen border-x border-secondary-200">
                    <div className="w-full h-full flex flex-col justify-between">
                        <div>
                            <h2 className="md:text-xl font-semibold p-4 border-b border-secondary-200">Code
                                Program Generation</h2>
                            <div className="p-4">
                                <h2 className="md:text-xl font-semibold mb-2">Prompt</h2>
                                <textarea
                                    name="prompt"
                                    placeholder="Please describe your creative ideas for the code program"
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
                                icon={<FaRegPaperPlane/>}
                                disabled={isLoading || !prompt.trim() || code !== null}
                                label="Generate"
                                fullWidth={true}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col p-4 md:p-6 w-full">
                    <div className="flex justify-start mb-4">
                        <Button
                            onClick={() => window.location.href = "/assets/code"}
                            color="primary"
                            label="Open My Assets"
                        />
                    </div>

                    <div className="rounded-lg flex-1 flex flex-col">
                        {isLoading ? (
                            <div className="w-full flex justify-center items-center h-[50vh]"><Loader size={"large"}/></div>
                        ) : code?.id ? (
                            <ProgramResult id={code.id} embedded={true}/>
                        ) : (
                            <p className="text-secondary-600 text-center mt-10">No generation yet. Try creating code.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgramGeneration;
