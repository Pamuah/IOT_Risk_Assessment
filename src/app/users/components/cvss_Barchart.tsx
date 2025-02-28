"use client";

import React, { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

interface RiskResponse {
  message: string;
  batch_id: number;
  risk_frequencies: Record<string, number>;
  average_cvss_scores: Record<string, number | null>;
  User_entries?: {
    control_id: string;
    sub_domain: string;
    domain: string;
    initial_control_grading: number;
    potential_risks: string;
  }[];
}

const Cvss_BarChart = ({ response }: { response: RiskResponse }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  // Extracting potential risks and corresponding average CVSS scores
  const potentialRisks =
    response.User_entries?.map((entry) => entry.potential_risks) || [];
  const avgCvssScores = potentialRisks.map(
    (risk) => response.average_cvss_scores[risk] || 0
  );

  useEffect(() => {
    if (chartRef.current) {
      const context = chartRef.current.getContext("2d");

      if (context) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(context, {
          type: "bar",
          data: {
            labels: potentialRisks,
            datasets: [
              {
                label: "Avg CVSS Score",
                data: avgCvssScores,
                backgroundColor: "rgba(255, 192, 192, 0.2)",
                borderColor: "rgba(255, 192, 192, 01)",
                borderWidth: 1,
                borderRadius: 5,
                barThickness: 50,
                maxBarThickness: 80,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "Distribution of Avg CVSS Scores",
                font: { size: 18, weight: "bold" },
              },
            },
            layout: {
              padding: 20,
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: { font: { size: 14 }, color: "black" },
                grid: { color: "rgba(0, 0, 0, 0.1)" },
              },
              x: {
                ticks: { font: { size: 14 }, color: "black" },
                grid: { display: false },
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [response]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <canvas ref={chartRef} className="w-full h-full"></canvas>
    </div>
  );
};

export default Cvss_BarChart;
