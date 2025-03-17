"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "@/app/GlobalContext/global_data";

const options = ["Accept", "Avoid", "Mitigate", "Transfer"];

interface UserEntry {
  control_id: string;
  sub_domain: string;
  domain: string;
  control: string;
  initial_control_grading: number;
  potential_risks: string;
  initial_domain_score: number;
  ideal_situation: number;
}

interface TableResponse {
  message: string;
  batch_id: number;
  risk_frequencies: Record<string, number | null>;
  average_cvss_scores: Record<string, number | null>;
  euclidean_score?: number;
  average_severity_score?: number;
  User_entries?: UserEntry[];
}

interface TableRow {
  domain: string;
  controlId: string;
  subDomain: string;
  control: string;
  potentialRisk: string;
  initialControlGrading: number;
  ctrlImpactScore: number | string;
  likelihood: number | string;
  newControlGrading: number;
  riskTreatment: string;
}

const RiskTable = ({ apiData }: { apiData: TableResponse }) => {
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const { setData } = useGlobalContext();

  useEffect(() => {
    if (apiData && apiData.User_entries) {
      const transformedScores: Record<string, number> = {};
      Object.keys(apiData.average_cvss_scores).forEach((key) => {
        transformedScores[key] = apiData.average_cvss_scores[key] ?? 0;
      });

      const formattedData: TableRow[] = apiData.User_entries.map((entry) => ({
        domain: entry.domain,
        controlId: entry.control_id,
        subDomain: entry.sub_domain,
        control: entry.control,
        potentialRisk: entry.potential_risks,
        initialControlGrading: entry.initial_control_grading,
        ctrlImpactScore: transformedScores[entry.potential_risks] ?? "N/A",
        likelihood:
          apiData.risk_frequencies[entry.potential_risks] ?? "Unknown",
        riskTreatment: "Accept",
        newControlGrading: entry.initial_control_grading,
      }));

      setTableData(formattedData);
    }
  }, [apiData]);

  // Handle risk treatment selection
  const handleChange = (controlId: string, value: string) => {
    setTableData((prev) =>
      prev.map((row) =>
        row.controlId === controlId
          ? {
              ...row,
              riskTreatment: value,
              newControlGrading:
                value === "Accept" || value === "Transfer"
                  ? row.initialControlGrading
                  : value === "Avoid"
                  ? 4
                  : 0, // You can use 0 or any placeholder for "Pending"
            }
          : row
      )
    );
  };

  // Handle input change for "Mitigate"
  const handleGradingInput = (controlId: string, value: string) => {
    const numericValue = parseInt(value, 10) || 0; // Convert to number
    setTableData((prev) =>
      prev.map((row) =>
        row.controlId === controlId
          ? { ...row, newControlGrading: numericValue }
          : row
      )
    );
  };

  const handleSubmit = async () => {
    try {
      const dataToSend = tableData.map(({ controlId, newControlGrading }) => ({
        control_id: controlId,
        treatment_option: newControlGrading,
      }));
      setData(dataToSend.map((item) => item.treatment_option));
      console.log(
        "Data being sent to API:",
        JSON.stringify(dataToSend, null, 2)
      );

      const response = await axios.post(
        "https://web-production-af645.up.railway.app/api/risk_treatment/",
        dataToSend
      );

      console.log("Response:", response.data);
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data. Please try again.");
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full border-collapse border border-slate-900">
        <thead>
          <tr className="text-center text-sm text-white bg-blue-500">
            <th className="border px-1 py-2">Domain</th>
            <th className="border px-1 py-2">Control ID</th>
            <th className="border px-1 py-2">Control Domain</th>
            <th className="border px-1 py-2">Control</th>
            <th className="border px-1 py-2">Potential Risk</th>
            <th className="border px-1 py-2">Analyst Control Grading</th>
            <th className="border px-1 py-2">PVT Likelihood</th>
            <th className="border px-1 py-2">PVT Impact Score</th>
            <th className="border px-1 py-2">Euclidean Score</th>
            <th className="border px-1 py-2">Average Severity Score</th>
            <th className="border px-1 py-2">Risk Treatment</th>
            <th className="border px-1 py-2">Treatment Control Grading</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr
              key={row.controlId}
              className="text-center text-sm text-slate-900 border-b border-slate-900"
            >
              <td className="border p-2">{row.domain}</td>
              <td className="border p-2">{row.controlId}</td>
              <td className="border p-2">{row.subDomain}</td>
              <td className="border p-2">{row.control}</td>
              <td className="border p-2">{row.potentialRisk}</td>
              <td className="border p-2">{row.initialControlGrading}</td>
              <td className="border p-2">{row.likelihood}</td>
              <td className="border p-2">{row.ctrlImpactScore}</td>

              {index === 0 && (
                <td
                  className="border p-2 border-r border-slate-900"
                  rowSpan={tableData.length}
                >
                  {apiData.euclidean_score ?? 0}
                </td>
              )}
              {index === 0 && (
                <td
                  className="border p-2 border-r border-slate-900"
                  rowSpan={tableData.length}
                >
                  {apiData.average_severity_score ?? 0}
                </td>
              )}

              {/* Risk Treatment Dropdown */}
              <td className="border p-2">
                <select
                  className="border p-1 rounded bg-slate-600 text-white"
                  value={row.riskTreatment}
                  onChange={(e) => handleChange(row.controlId, e.target.value)}
                >
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>

              {/* Treatment Control Grading - Input field for "Mitigate", otherwise display value */}
              <td className="border p-2">
                {row.riskTreatment === "Mitigate" ? (
                  <input
                    type="number"
                    className="border p-1 rounded text-white bg-slate-500"
                    min={row.initialControlGrading + 1}
                    value={
                      row.newControlGrading === 0 ? "" : row.newControlGrading
                    }
                    onChange={(e) =>
                      handleGradingInput(row.controlId, e.target.value)
                    }
                  />
                ) : (
                  row.newControlGrading
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Submit Risk Treatment
      </button>
    </div>
  );
};

export default RiskTable;
