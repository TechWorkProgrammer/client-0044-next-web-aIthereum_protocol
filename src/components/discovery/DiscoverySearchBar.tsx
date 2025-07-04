import React from "react";
import InputField from "@/components/input/InputField";

interface DiscoverySearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  handleSearch: () => void;
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<"mesh" | "music">>;
}

const DiscoverySearchBar: React.FC<DiscoverySearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  activeCategory,
  setActiveCategory,
}) => {
  return (
    <div className="relative mb-8 flex flex-row items-center space-y-4">
      <div className="flex items-center justify-center rounded-full shadow-md w-fit">
        <button
          className={`flex items-center gap-2 px-6 py-3 font-semibold transition text-lg text-white ${
            activeCategory === "mesh"
              ? "border-b border-accent-500 shadow-lg"
              : ""
          }`}
          onClick={() => setActiveCategory("mesh")}
        >
          3D Models
        </button>
      </div>

      <div className="flex flex-row items-center justify-center gap-4 w-fit border-l border-secondary-200 px-4 ml-4">
        <InputField
          name="search"
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search model / user..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
      </div>
    </div>
  );
};

export default DiscoverySearchBar;
