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
    const { lowerBound, upperBound, q1, q3 } = limites;

    const sortedData = [...data].sort((a, b) => a - b);
    const min = sortedData.find((value) => value >= lowerBound);
    const max = sortedData.reverse().find((value) => value <= upperBound);
    const median = sortedData[Math.floor(sortedData.length / 2)];

    // Dados do BoxPlot
    const boxPlotData = [
      {
        x: "",
        y: [
          parseFloat(lowerBound.toFixed(2)),
          parseFloat(q1.toFixed(2)),
          parseFloat(median.toFixed(2)),
          parseFloat(q3.toFixed(2)),
          parseFloat(upperBound.toFixed(2)),
        ],
      },
    ];

    // Dados dos Outliers
    const outliersData = outliers.map((outlier) => ({
      x: "",
      y: parseFloat(outlier.toFixed(2)),
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
        text: "BoxPlot",
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
        height={300}
        width={300}
      />
    </div>
  );
};

export default BoxPlotChart;
