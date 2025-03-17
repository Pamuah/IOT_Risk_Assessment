"use client";

import React, { useRef, useEffect } from "react";
import { Chart, ChartOptions } from "chart.js/auto";
import { useGlobalContext } from "@/app/GlobalContext/global_data";

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

const TreatmentRadar: React.FC<{ apiData: ApiResponse | null }> = ({
  apiData,
}) => {
  const { data } = useGlobalContext();
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const initialChartData =
    apiData?.User_entries?.map((entry) => ({
      label: entry.control_id,
      weight: Math.min(4, entry.initial_control_grading), // Ensure max 4
    })) || [];

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
                data: (data || []).map((item) => Number(item) || 0),
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
  }, [data, apiData]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="h-[400px] w-[400px] md:h-[500px] md:w-[500px] flex justify-center items-center">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default TreatmentRadar;
