import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ chartData }) => {
  const total = chartData.data.reduce((acc, value) => acc + value, 0);

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Pie Chart Data",
        data: chartData.data,
        backgroundColor: ["#FF9669", "#FF64B0", "#9C93CB"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 8,
          boxHeight: 8,
          useBorderRadius: true,
          borderRadius: 50,
        },
      },

      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            const percentage = ((value / total) * 100).toFixed(1); // Calculate percentage
            return `${tooltipItem.label}: ${value} (${percentage}%)`;
          },
        },
      },

      datalabels: {
        color: "#fff",
        font: {
          weight: "bold",
        },
        formatter: (value, context) => {
          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%`;
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
