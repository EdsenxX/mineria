import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  Title,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  Title,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const BarChart = ({
  title,
  labels,
  data,
}) => {

  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Programadores",
          data: data,
          borderColor: "#F1F5F9",
          backgroundColor: "#3482F6",
        },
      ],
    });
    setChartOptions({
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: title,
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, [title]);
  return (
    <>
      <div className="bh-white m-auto w-full rounded-lg border p-4 md:col-span-2">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default BarChart;
