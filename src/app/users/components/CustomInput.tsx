import React from "react";

interface CustomInputProps {
  width?: string;
  height?: string;
  hints: string;
  Value: string;
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  width = "w-40",
  height = "h-10",
  hints,
  onChange, // Fix: Add onChange as a prop
  label,
  Value,
}) => {
  return (
    <div>
      <h6 className="text-sm font-semibold text-gray-600 font-inter mt-4 mb-1">
        {label}
      </h6>
      <input
        type="text"
        className={`p-2 border border-gray-300 rounded-lg focus:outline-none 
                  focus:ring-2 focus:ring-slate-700 bg-transparent 
                  text-gray-500 font-inter ${width} ${height}`}
        placeholder={hints}
        value={Value}
        onChange={onChange} // Fix: Now correctly updates state
      />
    </div>
  );
};

export default CustomInput;
