"use client";

import React, { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

interface RiskResponse {
  message: string;
  batch_id: number;
  risk_frequencies: Record<string, number>; // Dynamic keys with number values
  average_cvss_scores: Record<string, number | null>; // Dynamic keys with number values
}

const BarChart = ({ response }: { response: RiskResponse }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  // Extract data dynamically from the response
  const riskLabels = Object.keys(response.risk_frequencies); // Risk names as x-axis labels
  const riskFrequencies = Object.values(response.risk_frequencies); // Frequencies as y-axis values

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
            labels: riskLabels, // Use risk categories as x-axis labels
            datasets: [
              {
                label: "Risk Frequency",
                data: riskFrequencies, // Use frequency as y-axis values
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
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
                text: "Monte Carlo Distribution of Sub-Categories",
                font: { size: 18, weight: "bold" },
              },
            },
            layout: {
              padding: 20,
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: { stepSize: 50, font: { size: 14 }, color: "black" },
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

export default BarChart;
