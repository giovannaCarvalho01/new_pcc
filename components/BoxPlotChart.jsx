import React from "react";
import Plot from "react-plotly.js";

const BoxPlotChart = ({ data, outliers, limites }) => {
  const { lowerBound, upperBound } = limites;

  // Incluindo limites e outliers nos dados principais
  const boxplotData = [lowerBound, ...data, upperBound];

  return (
    <Plot
      data={[
        {
          y: boxplotData, // Inclui os dados principais, limites e outliers
          type: "box",
          boxpoints: "outliers", // Exibe os outliers dentro do boxplot
          marker: {
            color: "rgb(9, 56, 125)",
            size: 6,
            outliercolor: "rgba(219, 64, 82, 0.6)", // Cor dos outliers
            line: {
              outliercolor: "rgba(219, 64, 82, 1.0)", // Cor da borda dos outliers
              outlierwidth: 2, // Largura da borda dos outliers
            },
          },
          line: {
            color: "rgb(9, 56, 125)",
          },
          name: "Valores",
          hoverinfo: "skip", // Desativa as informações automáticas como min, max, etc.
          hovertemplate: `<b>Categoria:</b> %{name}<extra></extra>`, // Apenas o nome da categoria
        },
        {
          // Exibe os outliers explicitamente
          y: outliers, // Outliers explícitos
          x: Array(outliers.length).fill(0), // Alinha os outliers no eixo x do boxplot
          type: "scatter",
          mode: "markers",
          name: "Outliers",
          marker: {
            color: "rgba(219, 64, 82, 0.6)",
            size: 8,
            symbol: "cross", // Para marcar os outliers
          },
          hoverinfo: "y", // Exibe apenas o valor dos outliers quando passamos o mouse sobre eles
          hovertemplate: `<b>Outlier:</b> %{y}<extra></extra>`, // Exibe o valor do outlier
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
