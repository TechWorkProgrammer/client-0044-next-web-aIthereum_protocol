import React, { useState, useEffect } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { useAlert } from "@/context/Alert";
import { getAccessToken } from "@/utils/user";
import api from "@/utils/axios";
import { io } from "socket.io-client";
import Button from "@/components/common/Button";
import Loader from "@/components/common/Loader";
import MeshResult from "@/components/mesh/MeshResult";
import { useRouter } from "next/router";

interface ThreeDGenerationForm {
  prompt: string;
  art_style: string;
  mode: string;
}

interface TaskResponse {
  taskIdPreview?: string;
  taskIdRefine?: string;
  state: string;
}

const ThreeDGeneration: React.FC = () => {
  const [form, setForm] = useState<ThreeDGenerationForm>({
    prompt: "",
    art_style: "realistic",
    mode: "preview",
  });
  const [task, setTask] = useState<TaskResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [version] = useState<"v3">("v3");

  const alert = useAlert();
  const router = useRouter();
  const eventName = task?.taskIdRefine || task?.taskIdPreview || null;

  useEffect(() => {
    if (!eventName) return;

    const socket = io("wss://api.althereum.techwork.store");

    socket.on(eventName, (data: { status: string; message?: string }) => {
      setTask((t) => (t ? { ...t, state: data.status } : t));

      if (["done", "SUCCEEDED"].includes(data.status)) {
        setIsLoading(false);
      }
    });

    return () => {
      socket.off(eventName);
      socket.disconnect();
    };
  }, [eventName]);

  const handleChange = (field: keyof ThreeDGenerationForm, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleGenerateMesh = async () => {
    if (!form.prompt.trim()) {
      alert(
        "Missing Prompt",
        "Please enter a description to generate 3D content.",
        "error"
      );
      return;
    }
    const token = getAccessToken();
    if (!token) {
      alert(
        "Authentication Required",
        "Please log in to generate 3D content.",
        "error"
      );
      return;
    }
    setIsLoading(true);
    try {
      const payload =
        version === "v3"
          ? { prompt: form.prompt, art_style: form.art_style, mode: form.mode }
          : { prompt: form.prompt };
      const res = await api.post("/mesh/generate", payload);
      setTask(res.data.data);
    } catch (err: any) {
      alert(
        "Generation Failed",
        err.response?.data?.message || "Try again later.",
        "error"
      );
      setIsLoading(false);
    }
  };

  const waitingForResult =
    isLoading || (task != null && !["done", "SUCCEEDED"].includes(task.state));

  return (
    <div className="text-white w-full">
      <div className="flex w-full">
        <div className="w-[200px] md:w-[280px] lg:w-[320px] flex flex-col bg-background-light h-[calc(100vh-4rem)] lg:h-screen border-x border-secondary-200">
          <div className="flex flex-col h-full">
            <div className="flex flex-col flex-1 overflow-hidden">
              <h2 className="md:text-xl font-semibold p-4 border-b border-secondary-200">
                3D Generation
              </h2>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div>
                  <label
                    htmlFor="prompt"
                    className="text-lg font-semibold block mb-2"
                  >
                    Prompt
                  </label>
                  <textarea
                    id="prompt"
                    name="prompt"
                    rows={4}
                    placeholder="Enter your 3D generation prompt"
                    value={form.prompt}
                    onChange={(e) => handleChange("prompt", e.target.value)}
                    disabled={isLoading || !!task}
                    className="
                                                w-full bg-primary-700 text-white placeholder-secondary-400
                                                border border-secondary-200 rounded p-4 resize-none
                                                focus:outline-none focus:ring-1 focus:ring-accent-500
                                                disabled:opacity-50
                                              "
                  />
                </div>
              </div>
            </div>
            <div className="p-4">
              <Button
                onClick={handleGenerateMesh}
                color="primary"
                icon={<FaRegPaperPlane />}
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
                onClick={() => router.push("/assets/3d")}
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
                <Loader size="large" />
              ) : task ? (
                <MeshResult
                  id={task.taskIdRefine || task.taskIdPreview!}
                  embedded
                />
              ) : (
                <p className="text-secondary-600">
                  No generation yet. Try generate something.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDGeneration;
