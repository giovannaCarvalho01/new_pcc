// components/BoxPlotChart.js
import React from 'react';
import Plot from 'react-plotly.js';

const BoxPlotChart = () => {
  return (
    <Plot
      data={[
        {
          y: [7, 8, 9, 10, 12, 20, 3], // Valores do boxplot, incluindo outliers
          type: 'box',
        //   name: 'Notas',
          boxpoints: 'outliers', // Exibe apenas os outliers
          marker: {
            color: 'rgb(9, 56, 125)', // Cor dos pontos
            size: 6, // Tamanho dos pontos (outliers)
          },
          line: {
            color: 'rgb(9, 56, 125)', // Cor da linha do boxplot
          },
        },
      ]}
      layout={{
        // title: 'Gráfico de Boxplot com Outliers',
        yaxis: { title: 'Valores', zeroline: false }, // Personalização do eixo Y
        xaxis: { showgrid: false, zeroline: false, showticklabels: false }, // Oculta os rótulos e linhas do eixo X
        boxmode: 'group', // Organização do boxplot
        margin: { l: 40, r: 40, t: 40, b: 40 }, // Ajuste das margens
        width: 500, // Largura do gráfico para compactar horizontalmente
        height: 400, // Altura do gráfico
      }}
      style={{ display: 'block', margin: '0 auto' }} // Centraliza o gráfico
    />
  );
};

export default BoxPlotChart;
