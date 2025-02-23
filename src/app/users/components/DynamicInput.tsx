import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

interface DynamicInputProps {
  width?: string;
  height?: string;
  hints: string;
  label?: string;
}

const DynamicCustomInput: React.FC<DynamicInputProps> = ({
  width = "w-40",
  height = "h-10",
  hints,
  label,
}) => {
  const [fields, setFields] = useState<string[]>([""]); // Initial input field

  // Handle input change
  const handleInputChange = (index: number, value: string) => {
    const newFields = [...fields];
    newFields[index] = value;
    setFields(newFields);
  };

  // Add new input field
  const addField = () => {
    setFields([...fields, ""]);
  };

  // Remove an input field
  const removeField = (index: number) => {
    if (fields.length > 1) {
      setFields(fields.filter((_, i) => i !== index));
    }
  };

  return (
    <div>
      <h6 className="text-sm font-semibold text-gray-600 font-inter mt-4 mb-1">
        {label}
      </h6>

      {fields.map((field, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <input
            type="text"
            className={`p-2 border border-gray-300 rounded-lg focus:outline-none 
                        focus:ring-2 focus:ring-slate-700 bg-transparent 
                        text-gray-500 font-inter ${width} ${height}`}
            placeholder={`${hints} ${index + 1}`}
            value={field}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          <button
            onClick={() => removeField(index)}
            className="p-2 bg-white rounded-lg hover:bg-gray-200 "
          >
            ❌
          </button>
        </div>
      ))}

      <button
        onClick={addField}
        className="  p-2 bg-green-500 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
      >
        <AiOutlinePlus size={20} />
      </button>
    </div>
  );
};

export default DynamicCustomInput;
