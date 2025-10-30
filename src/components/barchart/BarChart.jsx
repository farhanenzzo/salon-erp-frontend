import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { Skeleton } from "primereact/skeleton"; // Import PrimeReact Skeleton

const BarChart = ({ data, loading }) => {
  const [chartData, setChartData] = useState({});

  console.log("data in chart", data);

  useEffect(() => {
    if (data && data.revenuePerService) {
      // Extract the service names and corresponding revenues
      const labels = Object.keys(data.revenuePerService).map((label) =>
        label
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      ); // Capitalize each word in the label
      const revenueData = Object.values(data.revenuePerService); // Revenue values

      setChartData({
        labels,
        datasets: [
          {
            label: "Revenue",
            data: revenueData,
            backgroundColor: "#9B0E53", // Solid color for bars
            borderWidth: 0, // No border
            borderRadius: 8, // Rounded corners for bars
          },
        ],
      });
    } else {
      console.warn("BarChart: Invalid data provided.", data);
    }
  }, [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      bar: {
        barThickness: "flex",
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide X-axis grid lines
        },
        ticks: {
          color: "#666",
        },
        title: {
          display: true,
          text: "Services",
          color: "#333",
          font: {
            size: 14,
            weight: "bold",
          },
          padding: 10,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          color: "#666",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: function (tooltipItem) {
            return `Revenue: $${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full" style={{ height: "300px", minHeight: "200px" }}>
      {loading ? (
        // Skeleton loading state
        <div className="flex flex-column gap-3">
          <Skeleton width="100%" height="20px" borderRadius="8px" />
          <Skeleton width="100%" height="200px" borderRadius="8px" />
          <Skeleton width="100%" height="20px" borderRadius="8px" />
        </div>
      ) : chartData.labels && chartData.labels.length > 0 ? (
        // Render the chart if data is available
        <Bar data={chartData} options={options} />
      ) : (
        // Show message if no data is available
        <p>No data available</p>
      )}
    </div>
  );
};

export default BarChart;
