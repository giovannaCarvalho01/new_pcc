// components/BoxPlotChart.js
import React from 'react';
import Plot from 'react-plotly.js';

const BoxPlotChart = () => {
  return (
    <Plot
      data={[
        {
          y: [7, 8, 9, 10, 12, 20, 3],
          type: 'box',
          boxpoints: 'outliers',
          marker: {
            color: 'rgb(9, 56, 125)',
            size: 6,
          },
          line: {
            color: 'rgb(9, 56, 125)',
          },
        },
      ]}
      layout={{
        yaxis: { title: 'Valores', zeroline: false },
        xaxis: { showgrid: false, zeroline: false, showticklabels: false },
        boxmode: 'group',
        margin: { l: 20, r: 20, t: 20, b: 20 },
        width: 500, // Tamanho reduzido
        height: 350, // Tamanho reduzido
      }}
      style={{ display: 'block', margin: '0 auto' }}
    />
  );
};

export default BoxPlotChart;
