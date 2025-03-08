"use client";

import React, { useState, useEffect } from "react";

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
  frobenius_score?: number;
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
  newControlGrading: string;
  riskTreatment: string;
}

const RiskTable = ({ apiData }: { apiData: TableResponse }) => {
  const [tableData, setTableData] = useState<TableRow[]>([]);

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
        newControlGrading: "Pending",
      }));

      setTableData(formattedData);
    }
  }, [apiData]);

  const handleChange = (controlId: string, value: string) => {
    setTableData((prev) =>
      prev.map((row) =>
        row.controlId === controlId ? { ...row, riskTreatment: value } : row
      )
    );
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full border-collapse border border-slate-900">
        <thead>
          <tr className="text-center text-sm text-white bg-blue-400">
            <th className="border px-1 py-2">Domain</th>
            <th className="border px-1 py-2">Control ID</th>
            <th className="border px-1 py-2">Control Domain</th>
            <th className="border px-1 py-2">Control</th>
            <th className="border px-1 py-2">Potential Risk</th>
            <th className="border px-1 py-2">Analyst Control Grading</th>
            <th className="border px-1 py-2">PVT Impact Score</th>
            <th className="border px-1 py-2">Risk Likelihood</th>
            <th className="border px-1 py-2">Frobenius Score</th>
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
              <td className="border p-2">{row.ctrlImpactScore}</td>
              <td className="border p-2">{row.likelihood}</td>

              {/* Render Frobenius Score only in the first row and merge across all rows */}
              {index === 0 && (
                <td
                  className="border p-2 border-r border-slate-900"
                  rowSpan={tableData.length}
                >
                  {apiData.frobenius_score ?? 0}
                </td>
              )}

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
              <td className="border p-2">{row.newControlGrading}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiskTable;
