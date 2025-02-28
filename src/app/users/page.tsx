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
import RiskTable from "./components/RiskTable";
import RadarChart from "./components/RadarChart";
import Static_Radar from "./components/DynamicRadar";
import Cvss_BarChart from "./components/cvss_Barchart";

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
        {/* Static First Row */}
        <div className="flex flex-row items-start justify-center w-full gap-6 border p-4 rounded-lg shadow-md ">
          <CustomInput
            label="Control ID"
            width="w-40"
            height="h-10"
            hints="Ctrl-Id"
            Value={rows[0].control_id}
            onChange={(e) => handleInputChange(0, "control_id", e.target.value)}
          />
          <CustomInput
            label="Sub Domain"
            width="w-40"
            height="h-10"
            hints="eg: Secure wireless"
            Value={rows[0].sub_domain}
            onChange={(e) => handleInputChange(0, "sub_domain", e.target.value)}
          />
          <CustomInput
            label="Domain"
            width="w-40"
            height="h-10"
            hints="eg: Network layer"
            Value={rows[0].domain}
            onChange={(e) => handleInputChange(0, "domain", e.target.value)}
          />
          <CustomInput
            label="Potential Risk"
            width="w-40"
            height="h-10"
            hints="eg: Denial of service"
            Value={rows[0].potential_risks}
            onChange={(e) =>
              handleInputChange(0, "potential_risks", e.target.value)
            }
          />
          <Dropdown
            label="Initial Control Grading"
            selectedValue={rows[0].initial_control_grading}
            onSelect={(value) =>
              handleInputChange(0, "initial_control_grading", value)
            }
          />
        </div>

        {/* Dynamic Input Rows */}
        {rows.slice(1).map((row, index) => (
          <div
            key={index + 1}
            className="ml-7 flex flex-row items-start justify-center w-full gap-6 border p-4 rounded-lg shadow-md"
          >
            <CustomInput
              label="Control ID"
              width="w-40"
              height="h-10"
              hints="Ctrl-Id"
              Value={row.control_id}
              onChange={(e) =>
                handleInputChange(index + 1, "control_id", e.target.value)
              }
            />
            <CustomInput
              label="Sub Domain"
              width="w-40"
              height="h-10"
              hints="eg: Secure wireless"
              Value={row.sub_domain}
              onChange={(e) =>
                handleInputChange(index + 1, "sub_domain", e.target.value)
              }
            />
            <CustomInput
              label="Domain"
              width="w-40"
              height="h-10"
              hints="eg: Network layer"
              Value={row.domain}
              onChange={(e) =>
                handleInputChange(index + 1, "domain", e.target.value)
              }
            />
            <CustomInput
              label="Potential Risk"
              width="w-40"
              height="h-10"
              hints="eg: Denial of service"
              Value={row.potential_risks}
              onChange={(e) =>
                handleInputChange(index + 1, "potential_risks", e.target.value)
              }
            />
            <Dropdown
              label="Initial Control Grading"
              selectedValue={row.initial_control_grading}
              onSelect={(value) =>
                handleInputChange(index + 1, "initial_control_grading", value)
              }
            />

            {/* Remove Button */}
            <button
              onClick={() => removeRow(index + 1)}
              className="px-1 bg-red-500 text-white rounded-lg hover:bg-red-700"
            >
              <AiOutlineMinus size={20} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center">
        <CustomInput
          label="No. of Monte-Carlo Sim"
          width="w-40"
          height="h-10"
          hints="eg: 1000"
          Value={numSim.toString()}
          onChange={(e) => setNumSim(Number(e.target.value) || 0)}
        />
      </div>

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
      <div className="flex flex-col items-center justify-center">
        <h5 className="text-xl font-semibold text-gray-600 font-inter mt-8">
          Monte Carlo Simulation
        </h5>
      </div>

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

        <Cvss_BarChart
          response={
            apiResponse || {
              message: "",
              batch_id: 0,
              risk_frequencies: {},
              average_cvss_scores: {},
            }
          }
        />
      </div>
      {/* Displaying the Radar chart */}
      <div className="flex flex-col pt-2 items-center justify-center mt-3">
        <h6 className="text-4xl font-semibold text-slate-800 font-inter mb-1 mt-3">
          Radar Chart
        </h6>
        <div className="w-full h-[500px] flex flex-row items-start justify-start rounded-lg shadow-md p-5 gap-4 mx-1">
          <RadarChart
            apiData={
              (apiResponse ?? {
                message: "",
                batch_id: 0,
                risk_frequencies: {},
                average_cvss_scores: {},
                User_entries: [],
              }) as ApiResponse
            }
          />

          <Static_Radar apiData={apiResponse ?? null} />
        </div>
      </div>

      <div className="flex flex-row pt-2">
        <h6 className="text-4xl font-semibold text-slate-800 font-inter mb-1 mt-3">
          Risk Assessment
        </h6>
        {/* <Link
            href="/users"
            className="text-slate-800 flex items-center justify-end ml-20 space-x-2"
          >
            <IoArrowForward className="text-2xl" />
          </Link> */}
      </div>
      <div className="h-full w-full relative p-5 rounded-lg">
        <RiskTable
          apiData={
            apiResponse ?? {
              message: "",
              batch_id: 0,
              risk_frequencies: {},
              average_cvss_scores: {},
              User_entries: [],
            }
          }
        />
      </div>
    </div>
  );
};

export default UsersPage;
