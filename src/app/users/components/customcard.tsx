import React from "react";
import Image from "next/image";

interface CustomCardProps {
  description: string;
  imageSrc: string;
  backgroundColor?: string; // Dynamic background color
  hoverColor?: string; // Dynamic hover color
}

const CustomCard: React.FC<CustomCardProps> = ({
  description,
  imageSrc,
  backgroundColor = "bg-orange-200", // Default background color
  hoverColor = "hover:bg-orange-300", // Default hover color
}) => {
  return (
    <div
      className={` w-64 h-40 ${backgroundColor} shadow-lg rounded-lg p-4 ${hoverColor} mr-4 mb-4`}
    >
      {/* Image in the top-left corner */}
      <Image
        src={imageSrc} // Path to your image
        alt="Image"
        width={28}
        height={28}
        className=" rounded-full object-cover"
      />

      {/* Card content */}
      <div className="flex items-center justify-center h-full">
        <p className="text-sm font-normal text-gray-800 font-inter">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CustomCard;
