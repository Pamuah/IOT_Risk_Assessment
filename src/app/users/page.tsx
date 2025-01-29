"use client";
import React from "react";
import CustomCard from "./components/customcard";
import CustomSearch from "./components/search";
import RadarChart from "./components/RadarChart";
import { useState } from "react";
import { User, Users } from "../list";
import Table from "./components/Table";

const UsersPage = () => {
  const [users, setUsers] = useState("");
  const SearchFunction = (data: User[]) => {
    return data.filter((item) => item.first_name.toLowerCase().includes(users));
  };
  console.log(users);
  return (
    <div className="bg-white min-h-screen w-full flex flex-col">
      {/* Background image section */}
      <div
        className="h-[40vh] w-full bg-cover bg-center relative"
        style={{
          backgroundImage: `url('/assets/graph2.jpg')`,
          backgroundSize: "cover",
        }}
      >
        {/* Risk Assessment Section */}
        <div className="absolute top-8 left-8">
          <h1 className="text-4xl font-semibold text-white font-inter">
            <span className="block">Risk</span>
            <span className="block">Assessment</span>
          </h1>
        </div>

        {/* Quick Guide Section */}
        <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h3 className="text-2xl font-normal text-white font-inter text-center">
            Quick Guide
          </h3>
        </div>

        {/* Cards container */}
        <div className="absolute bottom-0 left-0 w-full flex justify-center space-x-4 transform translate-y-1/2">
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
      <div className="flex flex-col items-center justify-start flex-grow w-full mt-20">
        {/* Custom Search */}
        <div className="w-full flex flex-col items-center justify-center mb-8 mt-16">
          <CustomSearch onChange={(e) => setUsers(e.target.value)} />

          <Table data={SearchFunction(Users)} />
        </div>

        {/* Radar Chart */}
        <div className="w-full max-w-4xl">
          <RadarChart />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
