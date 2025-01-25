// components/BarChart.js
import React from 'react';
import Plot from 'react-plotly.js';

const BarChart = ({ observed, expected }) => {
  return (
    <Plot
      data={[
        {
          x: Array.from({ length: observed.length }, (_, i) => `Categoria ${i + 1}`),
          y: observed,
          type: 'bar',
          name: 'Observado',
          marker: { color: 'blue' },
        },
        {
          x: Array.from({ length: expected.length }, (_, i) => `Categoria ${i + 1}`),
          y: expected,
          type: 'bar',
          name: 'Esperado',
          marker: { color: 'orange' },
        },
      ]}
      layout={{
        barmode: 'group',
        xaxis: { title: 'Categorias' },
        yaxis: { title: 'Valores' },
        margin: { l: 30, r: 30, t: 30, b: 50 }, // Ajusta margens para menor espaço
        width: 500, // Define largura
        height: 350, // Define altura
      }}
      style={{ display: 'block', margin: '0 auto' }} // Centraliza o gráfico
    />
  );
};

export default BarChart;
