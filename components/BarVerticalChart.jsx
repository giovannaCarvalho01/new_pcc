import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { API_BASE_URL_PRD } from "../config"; // Importando a URL base

const BarVerticalChart = ({ filters, variavel }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (Object.keys(filters).length === 0 || !variavel) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams({ ...filters, variavel }).toString();
        const response = await fetch(`${API_BASE_URL_PRD}graficos?presenca=555&${queryParams}`);
        
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados");
        }

        const result = await response.json();

        // Formatação dos dados
        const formattedData = result.map(item => ({
          variavel: item.variavel,      // Nome da categoria (Feminino, Masculino, etc.)
          quantidade: Number(item.quantidade) // Quantidade como número
        }));

        setData(formattedData); // Atualiza os dados
      } catch (err) {
        setError(err.message); // Atualiza erro em caso de falha
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters, variavel]);

  if (loading) {
    return <div>Carregando gráfico...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  // Preparando os dados para o gráfico
  const chartData = {
    series: [
      {
        name: "Quantidade",
        data: data.map(item => item.quantidade), // Dados das barras
      },
    ],
    options: {
      chart: {
        type: "bar", // Tipo de gráfico
        height: "350", // Altura do gráfico
      },
      plotOptions: {
        bar: {
          horizontal: false, // Barra vertical
          columnWidth: "55%", // Largura das barras
          endingShape: "rounded", // Formato das barras
        },
      },
      xaxis: {
        categories: data.map(item => item.variavel), // Categorias (Feminino, Masculino, etc.)
      },
      yaxis: {
        title: {
          text: "Quantidade", // Título do eixo Y
        },
      },
      legend: {
        position: "bottom", // Coloca a legenda na parte inferior
        verticalAlign: "bottom", // Alinha verticalmente no fundo
        height: 36, // Define a altura da legenda
      },
    },
  };

  return (
    <div className="flex justify-center items-center" style={{ marginBottom: "130px" }}>
      <ReactApexChart width={350} height={350}
        options={chartData.options}
        series={chartData.series}
        type="bar"
      />
    </div>
  );
};

export default BarVerticalChart;
