import React, {useState, useEffect} from "react";
import {FaRegPaperPlane} from "react-icons/fa";
import {useAlert} from "@/context/Alert";
import {getAccessToken} from "@/utils/user";
import api from "@/utils/axios";
import {io} from "socket.io-client";
import Button from "@/components/common/Button";
import Loader from "@/components/common/Loader";
import MusicResult from "@/components/music/MusicResult";
import {useRouter} from "next/router";

interface MusicGenerationForm {
    prompt: string;
    gpt_description_prompt?: string;
    title?: string;
    genres: string;
}

interface TaskResponse {
    taskId: string;
    state: string;
}

const GENRE_LIST = [
    "Pop", "Rock", "Hip-Hop", "Jazz", "Classical", "Country", "Electronic", "Reggae", "Blues",
    "Metal", "Punk", "R&B", "Soul", "Folk", "Disco", "House", "Techno", "Trance", "Lo-Fi",
    "Chill", "Indie", "Dubstep", "Ambient", "Funk", "Gospel", "K-Pop", "J-Pop", "Orchestra",
    "Instrumental", "Synthwave", "Vaporwave", "Hardcore", "Latin", "Afrobeat"
];

const MusicGeneration: React.FC = () => {
    const [form, setForm] = useState<MusicGenerationForm>({
        prompt: "",
        gpt_description_prompt: "",
        title: "",
        genres: "",
    });
    const [task, setTask] = useState<TaskResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showAllGenres, setShowAllGenres] = useState(false);

    const alert = useAlert();
    const router = useRouter();
    const eventName = task?.taskId || null;

    useEffect(() => {
        if (!eventName) return;

        const socket = io("wss://api.aithereum.org");

        socket.on(eventName, (data: { status: string; message?: string }) => {
            setTask(t => t ? {...t, state: data.status} : t);

            if (["done", "SUCCEEDED"].includes(data.status)) {
                setIsLoading(false);
            }
        });

        return () => {
            socket.off(eventName);
            socket.disconnect();
        };
    }, [eventName]);

    const handleChange = (field: keyof MusicGenerationForm, value: string) =>
        setForm((f) => ({...f, [field]: value}));

    const handleGenreSelect = (genre: string) => {
        const list = form.genres.split(",").map((g) => g.trim()).filter(Boolean);
        const updated = list.includes(genre)
            ? list.filter((g) => g !== genre)
            : [...list, genre];
        setForm((f) => ({...f, genres: updated.join(", ")}));
    };

    const handleGenerateMusic = async () => {
        if (!form.gpt_description_prompt?.trim() && !form.prompt.trim()) {
            alert("Missing Prompt", "Please enter at least one prompt.", "error");
            return;
        }
        const token = getAccessToken();
        if (!token) {
            alert("Authentication Required", "Please log in to generate music.", "error");
            return;
        }
        setIsLoading(true);
        try {
            const payload = {
                prompt: form.prompt.trim(),
                gpt_description_prompt: form.gpt_description_prompt,
                title: form.title,
                tags: form.genres,
                mv: "sonic-v3-5",
                custom_mode: !!form.prompt.trim()
            };
            const res = await api.post("/music/generate", payload);
            setTask(res.data.data);
        } catch (err: any) {
            alert("Generation Failed", err.response?.data?.message || "Try again later.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const selectedGenres = form.genres
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean);

    const genresToShow = showAllGenres ? GENRE_LIST : GENRE_LIST.slice(0, 6);

    const orderedGenres = [
        ...selectedGenres.filter((g) => genresToShow.includes(g)),
        ...genresToShow.filter((g) => !selectedGenres.includes(g)),
    ];

    const waitingForResult = isLoading || (task != null && !["done", "SUCCEEDED"].includes(task.state));

    return (
        <div className="text-white w-full">
            <div className="flex w-full">
                <div
                    className="w-[200px] md:w-[280px] lg:w-[320px] flex flex-col bg-background-light h-[calc(100vh-4rem)] lg:h-screen border-x border-secondary-200">
                    <div className="flex flex-col h-full">
                        <div className="flex flex-col flex-1 overflow-hidden">
                            <h2 className="md:text-xl font-semibold p-4 border-b border-secondary-200">
                                Music Generation
                            </h2>
                            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                                <h3 className="text-lg font-semibold">Genres</h3>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {orderedGenres.map((g) => (
                                        <span
                                            key={g}
                                            onClick={() => handleGenreSelect(g)}
                                            className={`px-3 py-1 rounded text-sm font-medium cursor-pointer ${
                                                selectedGenres.includes(g)
                                                    ? "bg-accent-400 text-black"
                                                    : "bg-secondary-300 text-secondary-700"
                                            }`}
                                        >
                                          {g}
                                        </span>
                                    ))}
                                    <button
                                        onClick={() => setShowAllGenres(!showAllGenres)}
                                        className="text-white text-sm font-semibold"
                                    >
                                        {showAllGenres ? "Show Less" : "Show More"}
                                    </button>
                                </div>
                                <h3 className="text-lg font-semibold">Prompt</h3>
                                <textarea
                                    name="gpt_description_prompt"
                                    placeholder="Enter a prompt..."
                                    value={form.gpt_description_prompt}
                                    onChange={(e) => handleChange("gpt_description_prompt", e.target.value)}
                                    className="w-full bg-primary-700 text-white placeholder-secondary-400 border border-secondary-200 rounded p-4 resize-none focus:outline-none focus:ring-1 focus:ring-accent-500"
                                    rows={3}
                                />
                                <h3 className="text-lg font-semibold">Optional Title</h3>
                                <input
                                    type="text"
                                    placeholder="Input optional title"
                                    value={form.title}
                                    onChange={(e) => handleChange("title", e.target.value)}
                                    className="w-full bg-primary-700 text-white placeholder-secondary-400 border border-secondary-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-accent-500 disabled:opacity-50"
                                />
                                <h3 className="text-lg font-semibold">Optional Lyric</h3>
                                <textarea
                                    name="prompt"
                                    placeholder="Input optional Lyrics..."
                                    value={form.prompt}
                                    onChange={(e) => handleChange("prompt", e.target.value)}
                                    className="w-full bg-primary-700 text-white placeholder-secondary-400 border border-secondary-200 rounded p-4 resize-none focus:outline-none focus:ring-1 focus:ring-accent-500 disabled:opacity-50"
                                    rows={3}
                                />
                            </div>
                        </div>
                        <div className="p-4">
                            <Button
                                onClick={handleGenerateMusic}
                                color="primary"
                                icon={<FaRegPaperPlane/>}
                                label="Generate"
                                fullWidth
                                disabled={isLoading || !!task}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col p-4 md:p-6 w-full">
                    <div className="rounded-lg flex-1 flex flex-col">
                        <div className="flex justify-start mb-4">
                            <Button
                                onClick={() => router.push("/assets/music")}
                                color="primary"
                                label="Open My Assets"
                            />
                        </div>
                        <div className="flex items-center w-fit mb-4">
                            <h3 className="md:text-xl font-semibold whitespace-nowrap mr-4">
                                Generation Result
                            </h3>
                        </div>
                        <div className="w-full rounded-lg min-h-[50vh] flex items-center justify-center">
                            {waitingForResult ? (
                                <Loader size="large"/>
                            ) : task ? (
                                <MusicResult id={task.taskId} embedded/>
                            ) : (
                                <p className="text-secondary-600">No generation yet. Try generate something</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusicGeneration;
