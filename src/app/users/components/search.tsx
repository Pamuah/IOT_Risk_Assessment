import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface CustomSearchProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const CustomSearch: React.FC<CustomSearchProps> = ({ onChange }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <form className="w-2/5 relative">
      <input
        type="search"
        placeholder="Search Potential Threats"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onChange={onChange}
        className="w-full  p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-700 bg-transparent text-gray-500 font-inter"
      />
      {showTooltip && (
        <div className="absolute top-full left-0 mt-2 bg-gray-800 text-white text-sm rounded-md px-2 py-1 shadow-lg">
          Type here to search for items
        </div>
      )}
      <button className="absolute top-1/2 right-4 transform -translate-y-1/2 p-4 bg-sky-900 rounded-full hover:bg-sky-950">
        <AiOutlineSearch />
      </button>
    </form>
  );
};

export default CustomSearch;
