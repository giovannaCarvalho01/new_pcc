import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
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

const LineChart = ({ filters }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!filters) return;

      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3001/LineChart", {
          params: filters,
        });

        // Processar os dados retornados
        const anos = response.data.map((item) => item.ano);
        const medias = response.data.map((item) => item.media_nota_geral);

        setChartData({
          labels: anos,
          datasets: [
            {
              label: "Média das Notas",
              data: medias,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.3,
            },
          ],
        });
      } catch (error) {
        console.error("Erro ao buscar dados do gráfico:", error);
        setChartData(null);
      } finally {
        setLoading(false);
      }
    };

    console.log("Filtros:", filters); // Adicione isso para ver se os filtros estão mudando corretamente

    fetchData();
  }, [filters]); // Isso faz com que a requisição seja refeita toda vez que `filters` mudar

  if (loading) {
    return <p>Carregando gráfico...</p>;
  }

  if (!chartData) {
    return <p>Não há dados para exibir no gráfico.</p>;
  }

  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Gráfico de Linhas - Média das Notas por Ano",
          },
        },
      }}
    />
  );
};

export default LineChart;
