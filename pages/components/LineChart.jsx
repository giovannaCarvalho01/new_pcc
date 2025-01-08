// components/LineChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar os componentes necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  // Dados para o gráfico
  const data = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
    datasets: [
      {
        label: "Média de Notas",
        data: [30, 45, 60, 40, 70, 80],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3, // Curvatura da linha
      },
    ],
  };

  // Opções para o gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Permite ajustar o gráfico ao tamanho do container
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Gráfico de Linhas",
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
