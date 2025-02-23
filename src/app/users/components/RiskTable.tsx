"use client";

import React, { useState } from "react";

const options = ["Abort", "Accept", "Decline"];

const initialData = [
  {
    id: 1,
    domain: "IoT Security",
    controlId: "CTRL-001",
    subDomain: "Network Security",
    potentialRisk: "Unauthorized Access",
    initialControlGrading: "High",
    ctrlImpactScore: 8,
    likelihood: "Medium",
    riskTreatment: "Accept",
    newControlGrading: "Medium",
  },
  {
    id: 2,
    domain: "IoT Privacy",
    controlId: "CTRL-002",
    subDomain: "Data Protection",
    potentialRisk: "Data Breach",
    initialControlGrading: "Critical",
    ctrlImpactScore: 9,
    likelihood: "High",
    riskTreatment: "Decline",
    newControlGrading: "Low",
  },
];

const RiskTable = () => {
  const [tableData, setTableData] = useState(initialData);

  const handleChange = (id: number, value: string) => {
    setTableData((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, riskTreatment: value } : row
      )
    );
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full border-collapse border">
        <thead>
          <tr className="text-center text-sm text-white bg-blue-400 border-slate-900">
            <th className="border p-2">ID</th>
            <th className="border p-2">IoT Dev Domain</th>
            <th className="border p-2">Control ID</th>
            <th className="border p-2">Sub Domain</th>
            <th className="border p-2">Potential Risk</th>
            <th className="border p-2">Initial Control Grading</th>
            <th className="border p-2">Ctrl Impact Score</th>
            <th className="border p-2">Likelihood</th>
            <th className="border p-2">Risk Treatment</th>
            <th className="border p-2">New Control Grading</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id} className="text-center text-sm text-slate-900">
              <td className="border p-2">{row.id}</td>
              <td className="border p-2">{row.domain}</td>
              <td className="border p-2">{row.controlId}</td>
              <td className="border p-2">{row.subDomain}</td>
              <td className="border p-2">{row.potentialRisk}</td>
              <td className="border p-2">{row.initialControlGrading}</td>
              <td className="border p-2">{row.ctrlImpactScore}</td>
              <td className="border p-2">{row.likelihood}</td>
              <td className="border p-2">
                <select
                  className="border p-1 rounded bg-slate-600 text-white"
                  value={row.riskTreatment}
                  onChange={(e) => handleChange(row.id, e.target.value)}
                >
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border p-2">{row.newControlGrading}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiskTable;
