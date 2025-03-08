"use client";

import React, { useRef, useEffect, useState } from "react";
import { Chart, ChartOptions } from "chart.js/auto";

interface UserEntry {
  control_id: string;
  sub_domain: string;
  domain: string;
  initial_control_grading: number;
  potential_risks: string;
}

interface ApiResponse {
  message: string;
  batch_id: number;
  risk_frequencies: Record<string, number>;
  average_cvss_scores: Record<string, number | null>;
  User_entries?: UserEntry[];
}

const RadarChart: React.FC<{ apiData: ApiResponse | null }> = ({ apiData }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const initialChartData =
    apiData?.User_entries?.map((entry) => ({
      label: entry.control_id,
      weight: Math.min(4, entry.initial_control_grading), // Ensure max 4
    })) || [];

  // Initialize state with proper data
  const [updatedScores, setUpdatedScores] = useState<number[]>([]);

  useEffect(() => {
    if (initialChartData.length > 0) {
      setUpdatedScores(initialChartData.map((item) => item.weight));
    }
  }, [apiData]); // Update when API data arrives

  useEffect(() => {
    if (chartRef.current) {
      const context = chartRef.current.getContext("2d");

      if (context) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(context, {
          type: "radar",
          data: {
            labels: initialChartData.map((item) => item.label),
            datasets: [
              {
                label: "CIoT,C",
                data: initialChartData.map(() => 4), // Max value
                borderColor: "rgba(255, 165, 0, 0.5)",
                borderWidth: 2,
              },
              {
                label: "Initial BIoT,B Grading",
                data: initialChartData.map((item) => item.weight),
                borderColor: "rgba(0, 165, 0, 0.5)",
                borderWidth: 2,
              },
              {
                label: "Final P-SIRM2 BIoT",
                data: updatedScores,
                borderColor: "rgba(0, 0, 255, 0.5)",
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: "top" },
              tooltip: { enabled: true },
            },
            scales: {
              r: {
                min: 0,
                max: 4,
                angleLines: { color: "rgba(0, 0, 0, 0.2)" },
                grid: { color: "rgba(0, 0, 0, 0.1)" },
                ticks: { stepSize: 1, color: "rgba(0, 0, 0, 0.8)" },
              },
            },
          } as ChartOptions<"radar">,
        });
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [updatedScores, apiData]); // Ensure updates happen in real time

  // Handle input changes
  const handleInputChange = (index: number, value: string) => {
    if (value === "") {
      // If input is cleared, set it to 0
      const newScores = [...updatedScores];
      newScores[index] = 0;
      setUpdatedScores(newScores);
    } else {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 4) {
        // Only allow values between 0 and 4
        const newScores = [...updatedScores];
        newScores[index] = parsedValue;
        setUpdatedScores(newScores);
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="h-[400px] w-[400px] md:h-[500px] md:w-[500px] flex justify-center items-center">
        <canvas ref={chartRef}></canvas>
      </div>
      {initialChartData.length > 0 && (
        <div className="flex flex-wrap gap-4 items-center justify-center">
          {initialChartData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <label className="text-sm font-semibold text-gray-600">
                {item.label}:
              </label>
              <input
                type="number"
                value={updatedScores[index] || 0}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="border px-2 py-1 w-16 text-center"
                min={0}
                max={4}
                step={0.1}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RadarChart;
