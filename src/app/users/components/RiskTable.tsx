"use client";

import React, { useState, useEffect } from "react";

const options = ["Abort", "Accept", "Decline"];

interface UserEntry {
  control_id: string;
  sub_domain: string;
  domain: string;
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
  User_entries?: UserEntry[];
}

interface TableRow {
  id: number;
  domain: string;
  controlId: string;
  subDomain: string;
  potentialRisk: string;
  initialControlGrading: number;
  initialDomainScore: number;
  idealSituation: number;
  ctrlImpactScore: number | string;
  likelihood: number | string;
  riskTreatment: string;
  newControlGrading: string;
}

const RiskTable = ({ apiData }: { apiData: TableResponse }) => {
  const [tableData, setTableData] = useState<TableRow[]>([]);

  useEffect(() => {
    if (apiData && apiData.User_entries) {
      const transformedScores: Record<string, number> = {};
      Object.keys(apiData.average_cvss_scores).forEach((key) => {
        transformedScores[key] = apiData.average_cvss_scores[key] ?? 0;
      });

      const formattedData: TableRow[] = apiData.User_entries.map(
        (entry, index) => ({
          id: index + 1,
          domain: entry.domain,
          controlId: entry.control_id,
          subDomain: entry.sub_domain,
          potentialRisk: entry.potential_risks,
          initialControlGrading: entry.initial_control_grading,
          initialDomainScore: entry.initial_domain_score,
          idealSituation: entry.ideal_situation,
          ctrlImpactScore: transformedScores[entry.potential_risks] ?? "N/A",
          likelihood:
            apiData.risk_frequencies[entry.potential_risks] ?? "Unknown",
          riskTreatment: "Accept",
          newControlGrading: "Pending",
        })
      );

      setTableData(formattedData);
    }
  }, [apiData]);

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
            <th className="border p-2">Initial Domain Score</th>
            <th className="border p-2">Ideal Situation</th>
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
              <td className="border p-2">{row.initialDomainScore}</td>
              <td className="border p-2">{row.idealSituation}</td>
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
