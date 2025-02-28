"use client";

import React, { useRef, useEffect } from "react";
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

const Static_Radar: React.FC<{ apiData: ApiResponse | null }> = ({
  apiData,
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const chartData =
    apiData?.User_entries?.map((entry) => ({
      label: entry.control_id,
      weight: Math.min(4, entry.initial_control_grading), // Ensure it does not exceed 4
    })) || [];

  const variableScores = chartData.map((item) => Math.min(4, item.weight + 1)); // Ensure max 4
  const idealSituation = chartData.map(() => 4); // Set all to max (4)

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
            labels: chartData.map((item) => item.label),
            datasets: [
              {
                label: "Ideal Situation",
                data: idealSituation,
                borderColor: "rgba(255, 165, 0, 0.5)",
                borderWidth: 2,
              },
              {
                label: "Variable Score",
                data: variableScores,
                borderColor: "rgba(0, 165, 0, 0.5)",
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
              },
              tooltip: {
                enabled: true,
              },
            },
            scales: {
              r: {
                min: 0,
                max: 4,
                angleLines: {
                  color: "rgba(0, 0, 0, 0.2)",
                },
                grid: {
                  color: "rgba(0, 0, 0, 0.1)",
                },
                ticks: {
                  stepSize: 1,
                  color: "rgba(0, 0, 0, 0.8)",
                },
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
  }, [chartData]);

  return (
    <div className="h-[400px] w-[400px] md:h-[500px] md:w-[500px] flex justify-center items-center">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default Static_Radar;
