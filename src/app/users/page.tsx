import React from "react";
import CustomCard from "./components/customcard";
import CustomSearch from "./components/search";

const UsersPage = () => {
  return (
    <div className="bg-white h-screen w-screen">
      {/* Background image section */}
      <div
        className="h-2/5 w-screen bg-cover bg-center relative"
        style={{
          backgroundImage: `url('/assets/graph2.jpg')`,
          backgroundSize: "cover",
          //backgroundPosition: "center",
        }}
      >
        <div className="flex items-center justify-between w-full h-full">
          {/* Risk Assessment Section */}
          <div className="h-48 flex items-start justify-start pl-8 pt-8">
            <h1 className="text-4xl font-semibold text-white font-inter">
              <span className="block">Risk</span>
              <span className="block">Assessment</span>
            </h1>
          </div>

          {/* Centered Quick Guide Section */}
          <div className="flex-1 flex justify-center items-center">
            <h3 className="text-2xl font-normal text-white font-inter">
              Quick Guide
            </h3>
          </div>
        </div>

        {/* Cards container */}
        <div className="absolute bottom-[-50%] left-0 w-full flex flex-row justify-center space-x-4">
          <CustomCard
            description="Click on the search bar and type your query"
            imageSrc="/assets/one.png"
            backgroundColor="bg-almond"
            hoverColor="hover:bg-gray-300"
          />
          <CustomCard
            description="Select your search option and enter the number of queries."
            imageSrc="/assets/Two.png"
            backgroundColor="bg-almond"
            hoverColor="hover:bg-gray-300"
          />
          <CustomCard
            description="Scroll down to see the Monte Carlo simulation results."
            imageSrc="/assets/Three.png"
            backgroundColor="bg-almond"
            hoverColor="hover:bg-gray-300"
          />
        </div>
      </div>

      {/* Main content section */}
      <div className="h-3/5 w-full flex justify-center items-center">
        <CustomSearch />
      </div>
    </div>
  );
};

export default UsersPage;
