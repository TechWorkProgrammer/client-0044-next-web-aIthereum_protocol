import React, { useEffect, useState, useCallback, useRef } from "react";
import DiscoverySearchBar from "@/components/discovery/DiscoverySearchBar";
import Pagination from "@/components/common/Pagination";
import MeshCard from "@/components/mesh/MeshCard";
import MusicListItem from "@/components/music/MusicListItem";
import { useLoader } from "@/context/Loader";
import { useAlert } from "@/context/Alert";
import { MeshData } from "@/types/mesh";
import { MusicData } from "@/types/music";
import {
  getActiveCategory,
  saveActiveCategory,
} from "@/utils/discoveryCategory";

const DiscoveryComponent: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<"mesh" | "music">(
    "mesh"
  );
  const [hasMounted, setHasMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [meshList, setMeshList] = useState<MeshData[]>([]);
  const [musicList, setMusicList] = useState<MusicData[]>([]);
  const [filteredMeshList, setFilteredMeshList] = useState<MeshData[]>([]);
  const [filteredMusicList, setFilteredMusicList] = useState<MusicData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const loader = useLoader();
  const alert = useAlert();

  const fetchedMesh = useRef(false);
  const fetchedMusic = useRef(false);
  const hasFetched = useRef({ mesh: false, music: false });

  const fetchDataOnce = useCallback(
    async (
      url: string,
      setData: (data: any) => void,
      setFilteredData: (data: any) => void,
      category: string
    ) => {
      if (category === "mesh" && fetchedMesh.current) return;
      if (category === "music" && fetchedMusic.current) return;

      loader(true, { size: "large" });

      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setData(data.data || []);
          setFilteredData(data.data || []);
        } else {
          alert("Opss...", `Failed to fetch ${category} data`);
        }
      } catch {
        alert(
          "Internal Server Error",
          `An error occurred while fetching ${category} data`
        );
      } finally {
        loader(false);
        if (category === "mesh") fetchedMesh.current = true;
        if (category === "music") fetchedMusic.current = true;
      }
    },
    [loader, alert]
  );

  useEffect(() => {
    setHasMounted(true);
    const storedCategory = getActiveCategory();
    setActiveCategory(storedCategory);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      saveActiveCategory(activeCategory);
    }
  }, [activeCategory, hasMounted]);

  useEffect(() => {
    if (activeCategory === "mesh" && !hasFetched.current.mesh) {
      fetchDataOnce(
        `${API_BASE_URL}/mesh`,
        setMeshList,
        setFilteredMeshList,
        "mesh"
      ).then();
      hasFetched.current.mesh = true;
    } else if (activeCategory === "music" && !hasFetched.current.music) {
      fetchDataOnce(
        `${API_BASE_URL}/music`,
        setMusicList,
        setFilteredMusicList,
        "music"
      ).then();
      hasFetched.current.music = true;
    }
  }, [activeCategory, API_BASE_URL, fetchDataOnce]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredMeshList, filteredMusicList]);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();

    if (activeCategory === "mesh") {
      setFilteredMeshList(
        meshList.filter(
          (mesh) =>
            mesh.prompt?.toLowerCase().includes(query) ||
            mesh.modelType?.toLowerCase().includes(query)
        )
      );
    } else {
      setFilteredMusicList(
        musicList.filter(
          (music) =>
            music.title?.toLowerCase().includes(query) ||
            music.tags?.toLowerCase().includes(query)
        )
      );
    }
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return activeCategory === "mesh"
      ? filteredMeshList.slice(startIndex, startIndex + itemsPerPage)
      : filteredMusicList.slice(startIndex, startIndex + itemsPerPage);
  };

  if (!hasMounted) return null;

  return (
    <div className="min-h-screen w-full text-white flex flex-col justify-between items-center">
      <div className="w-full">
        <DiscoverySearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {activeCategory === "mesh" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getPaginatedData().map((mesh) => (
              <MeshCard key={mesh.id} mesh={mesh as MeshData} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getPaginatedData().map((music) => (
              <MusicListItem key={music.id} music={music as MusicData} />
            ))}
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={
          activeCategory === "mesh"
            ? filteredMeshList.length
            : filteredMusicList.length
        }
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />
    </div>
  );
};

export default DiscoveryComponent;
