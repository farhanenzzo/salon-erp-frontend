import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Skeleton } from "primereact/skeleton";
import styles from "./DoughnutChart.module.css";
import { APPOINTMENT_STATUSES } from "../../constants";
import { formatPrice } from "../../helpers/formatPrice";

Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ statsData, isLoading }) => {
  // Define labels
  const labels = [
    APPOINTMENT_STATUSES.UPCOMING,
    APPOINTMENT_STATUSES.COMPLETED,
    APPOINTMENT_STATUSES.CANCELLED,
  ];

  const dataValues = [
    statsData?.upcoming || 0,
    statsData?.completed || 0,
    statsData?.cancelled || 0,
  ];

  const backgroundColors = ["#F2A43F", "#0962BA", "#9B0E53"];

  const data = {
    labels,
    datasets: [
      {
        label: "Appointments",
        data: dataValues,
        backgroundColor: backgroundColors,
        borderRadius: 15,
        hoverOffset: 4,
        offset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
      },
      datalabels: {
        display: false,
      },
    },
  };

  const customLegend = (chart) => {
    const legendContainer = document.getElementById("chart-legends");
    if (!legendContainer) return;

    while (legendContainer.firstChild) {
      legendContainer.firstChild.remove();
    }

    const ul = document.createElement("ul");
    ul.className = styles.legendList;

    chart.data.labels.forEach((label, index) => {
      const li = document.createElement("li");
      li.className = styles.legendItem;

      const colorBox = document.createElement("span");
      colorBox.className = styles.legendColorBox;
      colorBox.style.backgroundColor =
        chart.data.datasets[0].backgroundColor[index];

      const text = document.createElement("span");
      text.className = styles.legendText;
      text.textContent = label;

      li.appendChild(colorBox);
      li.appendChild(text);
      ul.appendChild(li);
    });

    legendContainer.appendChild(ul);
  };

  const totalAppointments = dataValues.reduce((a, b) => a + b, 0);

  const centerTextPlugin = {
    id: "centerText",
    afterDraw: (chart) => {
      const { ctx } = chart;

      ctx.save();

      const x = chart.width / 2;
      const y = chart.height / 2;

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillStyle = "black";
      ctx.font = "bold 24px Arial";
      ctx.fillText(formatPrice(totalAppointments), x, y - 10);

      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.font = "14px Arial";
      ctx.fillText("Total", x, y + 20);

      ctx.restore();
    },
  };

  return (
    <div className={`${styles.doughnutContainer} w-full h-full`}>
      {isLoading ? (
        <Skeleton width="100%" height="250px" />
      ) : (
        <>
          <div className="w-full h-full">
            <Doughnut
              data={data}
              options={options}
              width={250}
              height={250}
              plugins={[
                centerTextPlugin,
                {
                  id: "customLegend",
                  afterDraw: (chart) => {
                    customLegend(chart);
                  },
                },
              ]}
            />
          </div>
          <div
            id="chart-legends"
            className={`${styles.customLegend} mt-4`}
          ></div>
        </>
      )}
    </div>
  );
};

export default DoughnutChart;
