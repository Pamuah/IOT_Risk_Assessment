import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
const CustomSearch = () => {
  return (
    <form className="w-2/5 relative">
      <input
        type="search"
        placeholder="Search"
        className="w-full  p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-700 bg-transparent text-gray-500 font-inter"
      />
      <button className="absolute top-1/2 right-4 transform -translate-y-1/2 p-4 bg-sky-900 rounded-full hover:bg-sky-950">
        <AiOutlineSearch />
      </button>
    </form>
  );
};

export default CustomSearch;
