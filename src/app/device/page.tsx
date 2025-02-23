"use client";
import React from "react";
import CustomInput from "../users/components/CustomInput";
import { useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import Link from "next/link";

const Device_SpecPage = () => {
  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [firmVersion, setfirmVersion] = useState("");
  const [usage, setUsage] = useState("");
  const [network, setnetwork] = useState("");
  return (
    <div className="bg-gray-100 min-h-screen w-full flex flex-col items-center justify-center">
      <div className="flex flex-row">
        <h1 className="text-4xl font-semibold text-slate-800 font-inter mb-3">
          Device Specifications
        </h1>
        <Link
          href="/users"
          className="text-slate-800  flex items-center justify-end ml-20 space-x-2"
        >
          <IoArrowForward className="text-2xl" />
        </Link>
      </div>
      <div className="h-1/4 w-1/3 bg-white border-slate-600   bg-center relative p-5 rounded-lg">
        <CustomInput
          label="Device Name"
          width="w-60"
          height="h-10"
          hints="eg: camera"
          onChange={(e) => setName(e.target.value)}
          Value={name}
        />
        <CustomInput
          label="Manufacturer"
          width="w-60"
          height="h-10"
          hints="eg: samsung"
          onChange={(e) => setManufacturer(e.target.value)}
          Value={manufacturer}
        />

        <CustomInput
          label="Firm Version"
          width="w-60"
          height="h-10"
          hints="eg: 1.0"
          onChange={(e) => setfirmVersion(e.target.value)}
          Value={firmVersion}
        />

        <CustomInput
          label="Device Use"
          width="w-60"
          height="h-10"
          hints="eg: Used to take photos"
          onChange={(e) => setUsage(e.target.value)}
          Value={usage}
        />

        <CustomInput
          label="Network Capabilities"
          hints="eg: wifi"
          onChange={(e) => setnetwork(e.target.value)}
          Value={network}
        />
      </div>
    </div>
  );
};

export default Device_SpecPage;
