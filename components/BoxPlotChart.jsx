import React from "react";
import Plot from "react-plotly.js";

const BoxPlotChart = ({ data, outliers, limites }) => {
  const { lowerBound, upperBound } = limites;

  // Incluindo limites nos dados principais
  const boxplotData = [lowerBound, ...data, upperBound];

  return (
    <Plot
      data={[
        {
          y: boxplotData, // Inclui os limites diretamente nos dados
          type: "box",
          boxpoints: "outliers", // Permite mostrar outliers no gráfico
          marker: {
            color: "rgb(9, 56, 125)",
            size: 6,
          },
          line: {
            color: "rgb(9, 56, 125)",
          },
          name: "Valores principais",
        },
        {
          y: outliers, // Outliers explícitos
          mode: "markers",
          marker: {
            color: "red",
            size: 8,
            symbol: "cross",
          },
          type: "scatter",
          name: "Outliers",
        },
      ]}
      layout={{
        yaxis: {
          title: "Valores",
          zeroline: false,
        },
        xaxis: {
          showgrid: false,
          zeroline: false,
          showticklabels: false,
        },
        boxmode: "group",
        margin: { l: 40, r: 20, t: 20, b: 40 },
        width: 500, // Tamanho do gráfico
        height: 350, // Tamanho do gráfico
      }}
      style={{ display: "block", margin: "0 auto" }}
    />
  );
};

export default BoxPlotChart;
