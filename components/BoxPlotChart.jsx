import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Importação do ApexCharts dinamicamente para suportar SSR no Next.js
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const BoxPlotChart = ({ data, outliers, limites }) => {
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    const { lowerBound, upperBound } = limites;

    // Dados do BoxPlot
    const boxPlotData = [
      {
        x: "",
        y: [lowerBound, ...data, upperBound],
      },
    ];

    // Dados dos Outliers
    const outliersData = outliers.map((outlier) => ({
      x: "",
      y: outlier,
    }));

    // Configuração do gráfico
    setChartOptions({
      chart: {
        type: "boxPlot",
        height: 350,
        background: "#FFFFFF",
        foreColor: "#333",
      },
      colors: ["#007BFF", "#1E90FF"], // Tons de azul para BoxPlot e marcadores
      title: {
        text: "BoxPlot com Outliers",
        align: "left",
      },
      tooltip: {
        shared: false,
        intersect: true,
      },
      plotOptions: {
        boxPlot: {
          colors: {
            upper: "#007BFF", // Azul escuro para a parte superior
            lower: "#1E90FF", // Azul claro para a parte inferior
          },
        },
      },
      markers: {
        size: 6,
        colors: ["#FF4560"], // Vermelho para os marcadores de outliers
        strokeColor: "#fff",
        strokeWidth: 2,
      },
      legend: {
        show: true,
        markers: {
          fillColors: ["#007BFF", "#FF4560"], // Azul para BoxPlot, vermelho para Outliers
        },
        labels: {
          colors: ["#333"], // Cor do texto da legenda
        },
      },
    });

    // Séries do gráfico
    setChartSeries([
      {
        name: "BoxPlot",
        type: "boxPlot",
        data: boxPlotData,
      },
      {
        name: "Outliers",
        type: "scatter",
        data: outliersData,
      },
    ]);
  }, [data, outliers, limites]);

  return (
    <div id="chart">
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="boxPlot"
        height={350}
      />
    </div>
  );
};

export default BoxPlotChart;
