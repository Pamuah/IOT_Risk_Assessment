"use client";

import React, { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

const BarChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null); // UseRef to store the Chart instance

  const chartData = [
    { firstName: "Alice", weight: 68 },
    { firstName: "Bob", weight: 75 },
    { firstName: "Charlie", weight: 80 },
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
          type: "bar",
          data: {
            labels: chartData.map((item) => item.firstName),
            datasets: [
              {
                label: "Weight",
                data: chartData.map((item) => item.weight),
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(75, 192, 192, 1)",
                ],
                borderWidth: 1,
                borderRadius: 10,
              },
            ],
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: "Weight Name Info",
              },
            },
            layout: {
              padding: 40,
            },
            scales: {
              x: {
                type: "category",
              },
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }

    // Cleanup: Destroy the chart instance when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartData]); // Only re-run when chartData changes

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default BarChart;
