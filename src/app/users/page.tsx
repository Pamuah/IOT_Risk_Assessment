"use client";
import React, { useState } from "react";
import CustomCard from "./components/customcard";
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
import TreatmentRadar from "./components/TreatedRadar";

interface ApiResponse {
  message: string;
  batch_id: number;
  risk_frequencies: Record<string, number>; // e.g. { "buffer error": 440 }
  average_cvss_scores: Record<string, number | null>; // e.g. { "buffer error": 8.24, "denial of service": null }
}

const UsersPage = () => {
  const [rows, setRows] = useState([
    {
      control: "",
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
        control: "",
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
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute top-8 left-0 w-full flex justify-between items-center px-8">
          <h1 className="text-4xl font-semibold text-white font-inter">
            P-SIRM<sup>²</sup>
          </h1>
        </div>

        <div className="absolute bottom-0 left-0 w-full flex justify-center space-x-4 transform translate-y-1/2">
          <CustomCard
            description="Please enter the details of your space IoT device."
            imageSrc="/assets/one.png"
            backgroundColor="bg-almond"
            hoverColor="hover:bg-gray-300"
          />
          <CustomCard
            description="Based on the control matrix (E.g., CSA Cloud Controls Matrix (CCM)) chosen, evaluate your space IoT device, enter details of the controls and possible risks."
            imageSrc="/assets/Two.png"
            backgroundColor="bg-almond"
            hoverColor="hover:bg-gray-300"
          />
          <CustomCard
            description="Provide Control Implementation Scores (CIS) for each control identified based on your knowledge of implementation maturity in your device. "
            imageSrc="/assets/Three.png"
            backgroundColor="bg-almond"
            hoverColor="hover:bg-gray-300"
          />

          <CustomCard
            description="Provide the number of Monte Carlo Runs – NB. More runs improve accuracy, uncertainty coverage, stability, and confidence. "
            imageSrc="/assets/four.png"
            backgroundColor="bg-almond"
            hoverColor="hover:bg-gray-300"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-24">
        <Link
          className="text-lg font-semibold text-blue-600 underline italic font-inter"
          href="/device"
          target="_blank"
          rel="noopener noreferrer"
        >
          Device Spec
        </Link>
      </div>
      {/* Main content section */}
      <div className="flex flex-col items-center justify-start flex-grow w-full mt-8">
        {/* Static First Row */}

        <div className="flex flex-row items-start justify-center w-full gap-6 border p-4 rounded-lg shadow-md ">
          <CustomInput
            label="Domain"
            width="w-40"
            height="h-10"
            hints="eg: Network layer"
            Value={rows[0].domain}
            onChange={(e) => handleInputChange(0, "domain", e.target.value)}
          />
          <CustomInput
            label="Control ID"
            width="w-40"
            height="h-10"
            hints="Ctrl-Id"
            Value={rows[0].control_id}
            onChange={(e) => handleInputChange(0, "control_id", e.target.value)}
          />
          <CustomInput
            label="Control Domain"
            width="w-40"
            height="h-10"
            hints="eg: Secure wireless"
            Value={rows[0].sub_domain}
            onChange={(e) => handleInputChange(0, "sub_domain", e.target.value)}
          />

          <CustomInput
            label="Control"
            width="w-40"
            height="h-10"
            hints="eg: Architect network using ..."
            Value={rows[0].control}
            onChange={(e) => handleInputChange(0, "control", e.target.value)}
          />

          <CustomInput
            label="Potential Risks"
            width="w-40"
            height="h-10"
            hints="eg: Denial of service"
            Value={rows[0].potential_risks}
            onChange={(e) =>
              handleInputChange(0, "potential_risks", e.target.value)
            }
          />
          <Dropdown
            label="Analyst Control Grading"
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
              label="Control Domain"
              width="w-40"
              height="h-10"
              hints="eg: Secure wireless"
              Value={row.sub_domain}
              onChange={(e) =>
                handleInputChange(index + 1, "sub_domain", e.target.value)
              }
            />

            <CustomInput
              label="Control"
              width="w-40"
              height="h-10"
              hints="eg: Denial of service"
              Value={row.control}
              onChange={(e) =>
                handleInputChange(index + 1, "control", e.target.value)
              }
            />

            <CustomInput
              label="Potential Risks"
              width="w-40"
              height="h-10"
              hints="eg: Denial of service"
              Value={row.potential_risks}
              onChange={(e) =>
                handleInputChange(index + 1, "potential_risks", e.target.value)
              }
            />
            <Dropdown
              label="Analyst Control Grading"
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
      <div className="flex flex-col items-center justify-center gap-4">
        <button
          onClick={addRow}
          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 mt-4"
        >
          <AiOutlinePlus size={20} /> Add Row
        </button>

        {/* Removed absolute positioning for better alignment */}
        <div className="flex flex-col items-center justify-center ml-11">
          <CustomInput
            label="Number of Monte-Carlo Simulations"
            width="w-40"
            height="h-10"
            hints="eg: 1000"
            Value={numSim.toString()}
            onChange={(e) => setNumSim(Number(e.target.value) || 0)}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          Submit Data
        </button>
      </div>

      {/* Monte Carlo Simulation */}
      <div className="flex flex-col items-center justify-center">
        <h5 className="text-xl font-semibold text-gray-600 font-inter mt-8">
          Monte Carlo Simulation
        </h5>
      </div>

      <div className="w-full h-full flex flex-row items-start justify-start rounded-lg shadow-md p-5 gap-4 mx-4 overflow-hidden">
        <div className="flex-1 ">
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
        </div>

        <div className="flex-1 ">
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
      </div>

      {/* Displaying the Radar chart */}
      <div className="flex flex-col w-full h-full pt-2 items-center mt-3">
        {/* Radar Chart Title */}
        <h6 className="text-2xl font-semibold text-slate-800 font-inter mb-20">
          Radar Chart
        </h6>

        {/* Radar Chart Diagram Section */}
        <div className="w-full h-full flex flex-row items-center justify-center rounded-lg shadow-md p-5 gap-4 mx-1">
          <div className="flex flex-col items-center justify-center mt-8">
            <div className="flex flex-col items-center justify-center mb-4">
              <h5 className="text-xl font-semibold text-gray-600 font-inter">
                Initial Security Posture
                <br />
                Phase 3: Deterministic Analysis
              </h5>
            </div>
            <Static_Radar apiData={apiResponse ?? null} />
          </div>

          <div className="flex flex-col items-center justify-center mt-8">
            <div className="flex flex-col items-center justify-center mb-4">
              <h5 className="text-xl font-semibold text-gray-600 font-inter">
                Full Implementation of P-SIRM<sup>2</sup> <br />
                Phase 4: Probabilistic Analysis
              </h5>
            </div>
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
          </div>
        </div>

        {/* Explanation Text */}
        <div className="flex flex-row items-start justify-start w-full pl-4">
          <h6 className="text-sm font-semibold text-gray-600 font-inter mt-4 mb-1">
            Where BIoT = Space IoT device under evaluation
            <br /> CIoT = Hypothetically Optimally Secure Space IoT device
          </h6>
        </div>
      </div>

      <div className="flex flex-row pt-2 items-center justify-center">
        <h6 className="text-2xl font-semibold text-slate-800 font-inter mb-1 mt-8 ">
          Risk Assessment
        </h6>
      </div>
      <div className="h-full w-full relative p-5 rounded-lg">
        <RiskTable
          apiData={
            apiResponse ?? {
              message: "",
              batch_id: 0,
              risk_frequencies: {},
              average_cvss_scores: {},
              euclidean_score: 0,
              User_entries: [],
            }
          }
        />
      </div>

      <div className="flex flex-col pt-2 items-center justify-center mt-8">
        <h6 className="text-2xl font-semibold text-slate-800 font-inter mb-4">
          Treated Radar Chart
        </h6>
        <TreatmentRadar apiData={apiResponse ?? null} />
      </div>
    </div>
  );
};

export default UsersPage;
