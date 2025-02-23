"use client";
import React, { useState } from "react";
import CustomCard from "./components/customcard";
//import RadarChart from "./components/RadarChart";
import CustomInput from "./components/CustomInput";
import Dropdown from "./components/Dropdown";
import BarChart from "./components/BarChart";
import Link from "next/link";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { sendControlData } from "./ApiServices";

interface ApiResponse {
  message: string;
  batch_id: number;
  risk_frequencies: Record<string, number>; // e.g. { "buffer error": 440 }
  average_cvss_scores: Record<string, number | null>; // e.g. { "buffer error": 8.24, "denial of service": null }
}
const UsersPage = () => {
  const [rows, setRows] = useState([
    {
      control_id: "",
      sub_domain: "",
      domain: "",
      potential_risks: "",
      initial_control_grading: 0,
    },
  ]);
  const [numSim, setNumSim] = useState<number>(0);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  // Function to update input values for a specific row
  const handleInputChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedRows = [...rows];
    updatedRows[index] = { ...updatedRows[index], [field]: value };
    setRows(updatedRows);
  };

  // Function to add a new row
  const addRow = () => {
    setRows([
      ...rows,
      {
        control_id: "",
        sub_domain: "",
        domain: "",
        potential_risks: "",
        initial_control_grading: 0,
      },
    ]);
  };

  // Function to remove a row (except the first one)
  const removeRow = (index: number) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index));
    }
  };

  //handling api submission
  const handleSubmit = async () => {
    try {
      const payload = {
        controls: rows, // Assuming 'rows' is your dynamic array of controls
        num_simulations: numSim,
      };

      console.log("Payload being sent:", JSON.stringify(payload, null, 2));

      const response: ApiResponse = await sendControlData(payload);

      console.log("Server Response 2:", JSON.stringify(response, null, 2)); // Log response

      setApiResponse(response);
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <div className="bg-white min-h-screen w-full flex flex-col">
      {/* Background image section */}
      <div
        className="h-[40vh] w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url('/assets/cyber_sec.jpg')` }}
      >
        <div className="absolute top-8 left-0 w-full flex justify-between items-center px-8">
          <h1 className="text-4xl font-semibold text-white font-inter">
            P-SIRM<sup>²</sup>
          </h1>
          <Link
            className="text-lg font-semibold text-white underline italic font-inter"
            href="/device"
          >
            Device Spec
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full flex justify-center space-x-4 transform translate-y-1/2">
          <CustomCard
            description="Click on the search bar and type your query"
            imageSrc="/assets/one.png"
            backgroundColor="bg-almond"
            hoverColor="hover:bg-gray-300"
          />
          <CustomCard
            description="Select your search option and enter the number of Simulations to be done."
            imageSrc="/assets/Two.png"
            backgroundColor="bg-almond"
            hoverColor="hover:bg-gray-300"
          />
          <CustomCard
            description="Scroll down to see the result of the Monte Carlo simulation and radar chart."
            imageSrc="/assets/Three.png"
            backgroundColor="bg-almond"
            hoverColor="hover:bg-gray-300"
          />
        </div>
      </div>

      {/* Main content section */}
      <div className="flex flex-col items-center justify-start flex-grow w-full mt-20">
        {/* Dynamic Input Rows */}
        {rows.map((row, index) => (
          <div
            key={index}
            className="flex flex-row items-start justify-center w-full gap-6 border p-4 rounded-lg shadow-md"
          >
            <CustomInput
              label="Control ID"
              width="w-40"
              height="h-10"
              hints="Ctrl-Id"
              Value={row.control_id}
              onChange={(e) =>
                handleInputChange(index, "control_id", e.target.value)
              }
            />
            <CustomInput
              label="Sub Domain"
              width="w-40"
              height="h-10"
              hints="eg: Secure wireless"
              Value={row.sub_domain}
              onChange={(e) =>
                handleInputChange(index, "sub_domain", e.target.value)
              }
            />
            <CustomInput
              label="Domain"
              width="w-40"
              height="h-10"
              hints="eg: Network layer"
              Value={row.domain}
              onChange={(e) =>
                handleInputChange(index, "domain", e.target.value)
              }
            />
            <CustomInput
              label="Potential Risk"
              width="w-40"
              height="h-10"
              hints="eg: Denial of service"
              Value={row.potential_risks}
              onChange={(e) =>
                handleInputChange(index, "potential_risks", e.target.value)
              }
            />
            <Dropdown
              label="Initial Control Grading"
              selectedValue={row.initial_control_grading} // ✅ Pass state
              onSelect={(value) =>
                handleInputChange(index, "initial_control_grading", value)
              } // ✅ Update state when selected
            />

            {/* Remove Button (Disabled for first row) */}
            {index !== 0 && (
              <button
                onClick={() => removeRow(index)}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
              >
                <AiOutlineMinus size={20} />
              </button>
            )}
          </div>
        ))}
        <CustomInput
          label="No. of Monte-Carlo Sim"
          width="w-40"
          height="h-10"
          hints="eg: 1000"
          Value={numSim.toString()}
          onChange={(e) => setNumSim(Number(e.target.value) || 0)}
        />
        {/* Add Row Button */}
        <div className="flex flex-row items-center justify-center gap-3">
          <button
            onClick={addRow}
            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 mt-4"
          >
            <AiOutlinePlus size={20} /> Add Row
          </button>

          <button
            onClick={handleSubmit}
            className="mt-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            Submit Data
          </button>
        </div>

        {/* Radar Chart 
        <h5 className="text-xl font-semibold text-gray-600 font-inter mt-4 mb-2">
          Security Assessment
        </h5>
        <div className="w-full h-96 flex flex-row items-center justify-center gap-10 max-w-4xl">
          <RadarChart />
          <RadarChart />
        </div>
*/}
        {/* Monte Carlo Simulation */}
        <h5 className="text-xl font-semibold text-gray-600 font-inter mt-8">
          Monte Carlo Simulation
        </h5>
        <div className="w-full h-[500px] flex flex-row items-start justify-start rounded-lg shadow-md p-5 gap-4 mx-4">
          <BarChart
            response={
              apiResponse || {
                message: "",
                batch_id: 0,
                risk_frequencies: {},
                average_cvss_scores: {},
              }
            }
          />

          {/* <BarChart /> */}
        </div>
      </div>
      <div className="flex flex-row items-end justify-end mt-4 mr-2">
        <Link
          className="text-lg font-semibold text-blue-600 underline italic font-inter"
          href="/vulnerability"
        >
          view Risk Assessment list
        </Link>
      </div>
    </div>
  );
};

export default UsersPage;
