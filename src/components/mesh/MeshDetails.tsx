import React, { useState, useEffect, useRef } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { FaDownload } from "react-icons/fa";
import Image from "next/image";
import MeshCard from "@/components/mesh/MeshCard";
import { useAlert } from "@/context/Alert";
import api from "@/utils/axios";

type MeshDetailsProps = {
  title: string;
  taskId: string;
  modelType?: string;
  userId?: string;
  username?: string;
  createdAt?: string;
  modelLinks: { type: string; previewUrl?: string; refineUrl?: string }[];
  textures?: { id: string; type: string; url: string }[];
};

const MeshDetails: React.FC<MeshDetailsProps> = ({
  title,
  taskId,
  modelType,
  userId,
  username,
  createdAt,
  modelLinks,
  textures,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [userMeshes, setUserMeshes] = useState<any[]>([]);
  const [fetchError, setFetchError] = useState(false);
  const hasFetched = useRef(false);
  const alert = useAlert();
  const shareLink = `${window.location.origin}/3d/${taskId}`;

  useEffect(() => {
    if (!userId || hasFetched.current) return;
    hasFetched.current = true;
    api
      .get(`/mesh/user/${userId}`)
      .then((response) => setUserMeshes(response.data.data))
      .catch(() => setFetchError(true));
  }, [userId]);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(shareLink).then(() => {
      alert("Link copied to clipboard!", "success");
    });
  };

  return (
    <div className="w-full mt-8 p-6 rounded-lg shadow-lg space-y-6 text-white">
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{title || "Untitled Model"}</h2>
          <div className="flex flex-col">
            <p className="text-lg text-gray-300">{modelType || ""}</p>
            {username && createdAt && (
              <p className="text-sm text-gray-400 mt-1">
                Created by <span className="font-medium">{username}</span> on{" "}
                {createdAt}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-md shadow-md bg-primary-500 hover:bg-accent-600 transition"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            {isFavorite ? (
              <AiFillHeart className="w-6 h-6 text-red-500" />
            ) : (
              <AiOutlineHeart className="w-6 h-6 text-white" />
            )}
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-md shadow-md bg-primary-500 hover:bg-accent-600 transition"
            onClick={handleShare}
          >
            <AiOutlineShareAlt className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Model Downloads</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {modelLinks.map(({ type, previewUrl, refineUrl }) => (
            <div
              key={type}
              className="flex items-center justify-between bg-primary-600 p-3 rounded"
            >
              <p className="font-medium">{type}</p>
              <div className="flex space-x-2">
                {previewUrl && (
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="p-2 bg-secondary-500 text-white rounded-md flex items-center">
                      <FaDownload className="w-4 h-4 mr-1" /> Preview
                    </button>
                  </a>
                )}
                {refineUrl && (
                  <a href={refineUrl} target="_blank" rel="noopener noreferrer">
                    <button className="p-2 bg-accent-500 text-black rounded-md flex items-center">
                      <FaDownload className="w-4 h-4 mr-1" /> Refine
                    </button>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {textures && textures.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Textures</h3>
          <div className="flex flex-wrap gap-4">
            {textures.map((texture) => (
              <div key={texture.id} className="flex flex-col items-center">
                <a href={texture.url} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={texture.url}
                    alt={texture.type}
                    width={100}
                    height={100}
                    className="rounded-md"
                  />
                </a>
                <span className="mt-1 capitalize text-sm">{texture.type}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-xl font-semibold mb-2">
          Other Models by {username}
        </h3>
        {fetchError ? (
          <div className=" gap-4">
            <p>Data user not found</p>
          </div>
        ) : userMeshes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {userMeshes.map((mesh) => (
              <MeshCard key={mesh.id} mesh={mesh} />
            ))}
          </div>
        ) : (
          <div className=" gap-4">
            <p>User Didn&#39;t have another object</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeshDetails;
