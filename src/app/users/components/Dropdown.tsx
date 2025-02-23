import React, { useState } from "react";

interface DropdownProps {
  label: string;
  selectedValue: number; // 👈 Receive selected value from parent
  onSelect: (value: number) => void; // 👈 Callback to update parent state
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  selectedValue,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [0, 1, 2, 3, 4]; // 👈 Ensure numbers are used

  const handleSelect = (value: number) => {
    onSelect(value); // 👈 Update state in parent
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
        {selectedValue} {/* 👈 Use parent state instead of local state */}
        <span className="text-gray-500">&#9662;</span> {/* Down Arrow */}
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-lg z-10 text-gray-600">
          {options.map((option, index) => (
            <li
              key={index}
              className="p-3 hover:bg-slate-500 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
