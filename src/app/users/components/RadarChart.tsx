"use client";

import React, { useRef, useEffect } from "react";
import { Chart, ChartOptions } from "chart.js/auto";

const RadarChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null); // UseRef to store the Chart instance

  const chartData = [
    { firstName: "Alice", weight: 68 },
    { firstName: "Bob", weight: 75 },
    { firstName: "Charlie", weight: 80 },
    { firstName: "Prince", weight: 70 },
    { firstName: "Diana", weight: 60 },
  ];

  useEffect(() => {
    if (chartRef.current) {
      const context = chartRef.current.getContext("2d");

      if (context) {
        // Destroy the existing chart instance to prevent duplicate charts
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        // Create a new chart instance and store it in the ref
        chartInstanceRef.current = new Chart(context, {
          type: "radar",
          data: {
            labels: chartData.map((item) => item.firstName),
            datasets: [
              {
                label: "Ideal Situation",
                data: chartData.map((item) => item.weight),
                backgroundColor: "rgba(255, 165, 0, 0.2)",
                borderColor: "rgba(255, 165, 0, 0.5)",
                borderWidth: 1,
              },
              {
                label: "Control Score",
                data: chartData.map((item) => item.weight + 5), // Example adjustment
                backgroundColor: "rgba(0, 0, 255, 0.1)",
                borderColor: "rgba(0, 0, 255, 0.5)",
                borderWidth: 1,
              },
              {
                label: "Variable Score",
                data: chartData.map((item) => item.weight - 5), // Example adjustment
                backgroundColor: "rgba(0, 165, 0, 0.2)",
                borderColor: "rgba(0, 165, 0, 0.5)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
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
                angleLines: {
                  color: "rgba(0, 0, 0, 0.2)", // Customize angle lines
                },
                grid: {
                  color: "rgba(0, 0, 0, 0.1)", // Customize grid lines
                },
                ticks: {
                  backdropColor: "rgba(255, 255, 255, 0.8)", // Background color for ticks
                  stepSize: 10,
                  color: "rgba(0, 0, 0, 0.8)",
                },
              },
            },
          } as ChartOptions<"radar">,
        });
      }
    }

    // Cleanup: Destroy the chart instance when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartData]);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default RadarChart;
