import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ labels, data, title }) {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels,
      datasets: [
        {
          label: title,
          data,
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(153, 102, 255)",
            "rgb(255, 159, 64)",
            "rgb(25, 59, 132)",
            "rgb(254, 162, 235)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(153, 102, 255)",
            "rgb(255, 159, 64)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(153, 102, 255)",
            "rgb(255, 159, 64)",
            "rgb(25, 59, 132)",
            "rgb(254, 162, 235)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(153, 102, 255)",
            "rgb(255, 159, 64)",
          ],
          borderWidth: 1,
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
          text: "Satisfacción de los programadores",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, [title]);

  return <Pie data={chartData} options={chartOptions} />;
}
