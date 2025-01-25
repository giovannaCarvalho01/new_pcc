// components/ChiSquareTable.js
import React from 'react';

// Função para calcular o Qui-Quadrado
const calculateChiSquare = (observed, expected) => {
  if (observed.length !== expected.length) {
    throw new Error("As listas de valores observados e esperados devem ter o mesmo tamanho.");
  }

  let chiSquare = 0;
  for (let i = 0; i < observed.length; i++) {
    chiSquare += Math.pow(observed[i] - expected[i], 2) / expected[i];
  }

  return chiSquare.toFixed(2); // Retorna com 2 casas decimais
};

// Função para calcular o p-valor (aproximação para uma distribuição qui-quadrado com 2 graus de liberdade)
const calculatePValue = (chiSquareValue, degreesOfFreedom = 2) => {
  const pValue = 1 - (chiSquareValue / degreesOfFreedom); // Simulação simples de p-valor
  return pValue.toFixed(4); // Limitar o p-valor a 4 casas decimais
};

const ChiSquareTable = ({ observed, expected }) => {
  const chiSquare = calculateChiSquare(observed, expected);
  const pValue = calculatePValue(chiSquare);

  return (
    <div>
      {/* <h2>Resultados do Teste Qui-Quadrado</h2> */}
      <table
        style={{
          margin: '20px auto',
          borderCollapse: 'collapse',
          width: '80%',
          textAlign: 'left',
          border: '1px solid #ddd',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
            <th style={{ padding: '10px' }}>Métrica</th>
            <th style={{ padding: '10px' }}>Valor</th>
          </tr>
        </thead>
        <tbody>
          {/* Linhas para cada categoria */}
          {observed.map((obs, index) => (
            <tr key={index}>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{`Categoria ${index + 1}`}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                Observado: {obs}, Esperado: {expected[index]}, Diferença: {Math.pow(obs - expected[index], 2).toFixed(2)}
              </td>
            </tr>
          ))}
          {/* Linha para o valor total de Qui-Quadrado */}
          <tr>
            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
              <strong>Total Qui-Quadrado</strong>
            </td>
            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{chiSquare}</td>
          </tr>
          {/* Linha para o P-valor */}
          <tr>
            <td style={{ padding: '10px' }}>
              <strong>P-Valor</strong>
            </td>
            <td style={{ padding: '10px' }}>{pValue}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ChiSquareTable;
