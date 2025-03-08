import React, { useState } from "react";

interface DropdownProps {
  label: string;
  selectedValue: number;
  onSelect: (value: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  selectedValue,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const options = [0, 1, 2, 3, 4];

  // Short descriptions for each number
  const hoverTexts: Record<number, string> = {
    0: "Not implemented",
    1: "Hardly implemented",
    2: "Moderately implemented",
    3: "Fully implemented",
    4: "Monitored and Governed",
  };

  const handleSelect = (value: number) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-64">
      <h6 className="text-sm font-semibold text-gray-600 font-inter mt-4 mb-1">
        {label}
      </h6>

      {/* Dropdown Button */}
      <button
        className="w-40 h-10 p-3 border border-gray-300 rounded-lg bg-white text-gray-500 
                   focus:ring-2 focus:ring-slate-700 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue}
        <span className="text-gray-500">&#9662;</span> {/* Down Arrow */}
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-lg z-10 text-gray-600">
          {options.map((option) => (
            <li
              key={option}
              className="p-3 hover:bg-slate-500 cursor-pointer relative"
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setHoveredIndex(option)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {option}

              {/* Hover Text Display */}
              {hoveredIndex === option && (
                <div className="absolute left-full ml-3 px-3 py-1 text-xs bg-black text-white rounded shadow-md">
                  {hoverTexts[option]}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
