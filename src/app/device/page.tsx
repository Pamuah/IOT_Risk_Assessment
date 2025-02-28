"use client";
import React, { useState } from "react";
import CustomInput from "../users/components/CustomInput";
import { IoArrowForward } from "react-icons/io5";
import Link from "next/link";
import axios from "axios";

const Device_SpecPage = () => {
  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [firmVersion, setFirmVersion] = useState("");
  const [usage, setUsage] = useState("");
  const [network, setNetwork] = useState("");

  const handleSubmit = async () => {
    const deviceData = {
      name,
      manufacturer,
      firm_version: firmVersion,
      usage,
      network,
    };

    try {
      const response = await axios.post(
        "https://web-production-af645.up.railway.app/device/",
        deviceData, // pass the data directly
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.data);
      alert("Device specifications submitted successfully!");
    } catch (error) {
      console.error("Error submitting device specs:", error);
      alert("Failed to submit device specifications.");
    }
  };

  return (
    <div
      className="bg-gray-100 min-h-screen w-full flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url('../assets/droplet.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-row">
        <h1 className="text-4xl font-semibold text-slate-800 font-inter mb-3">
          Device Specifications
        </h1>
        <Link
          href="/users"
          className="text-slate-800 flex items-center justify-end ml-20 space-x-2"
        >
          <IoArrowForward className="text-2xl" />
        </Link>
      </div>
      <div className="h-1/4 w-1/3 bg-white border-slate-600 bg-center relative p-5 rounded-lg">
        <CustomInput
          label="Device Name"
          hints="e.g., Camera"
          width="w-full"
          onChange={(e) => setName(e.target.value)}
          Value={name}
        />
        <CustomInput
          label="Manufacturer"
          hints="e.g., Samsung"
          width="w-full"
          onChange={(e) => setManufacturer(e.target.value)}
          Value={manufacturer}
        />
        <CustomInput
          label="Firmware Version"
          hints="e.g., 1.0"
          width="w-full"
          onChange={(e) => setFirmVersion(e.target.value)}
          Value={firmVersion}
        />
        <CustomInput
          label="Device Use"
          hints="e.g., Used to take photos"
          width="w-full"
          onChange={(e) => setUsage(e.target.value)}
          Value={usage}
        />
        <CustomInput
          label="Network Capabilities"
          hints="e.g., WiFi"
          width="w-full"
          onChange={(e) => setNetwork(e.target.value)}
          Value={network}
        />
        <button
          onClick={() => {
            handleSubmit();
            setName("");
            setManufacturer("");
            setFirmVersion("");
            setUsage("");
            setNetwork("");
          }}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Device_SpecPage;
