import React from 'react';

const ChiSquareTable = ({ chiSquareResult }) => {
  // Extrai os dados do resultado
  const { qui2, valor_p, graus_de_liberdade, frequencias_observadas, frequencias_esperadas, resultado_significativo } = chiSquareResult;

  return (
    <div>
      <table
        style={{
          margin: '20px auto',
          borderCollapse: 'collapse',
          width: '100%',
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
          {/* Qui-Quadrado */}
          <tr>
            <td style={{ padding: '10px' }}><strong>Qui-Quadrado</strong></td>
            <td style={{ padding: '10px' }}>{qui2}</td>
          </tr>

          {/* Valor-p */}
          <tr>
            <td style={{ padding: '10px' }}><strong>Valor-p</strong></td>
            <td style={{ padding: '10px' }}>{valor_p}</td>
          </tr>

          {/* Graus de Liberdade */}
          <tr>
            <td style={{ padding: '10px' }}><strong>Graus de Liberdade</strong></td>
            <td style={{ padding: '10px' }}>{graus_de_liberdade}</td>
          </tr>

          {/* Frequências Observadas e Esperadas */}
          <tr>
            <td style={{ padding: '10px' }}><strong>Frequências Observadas</strong></td>
            <td style={{ padding: '10px' }}>
              {frequencias_observadas.map((row, index) => (
                <div key={index}>{`[${row.join(", ")}]`}</div>
              ))}
            </td>
          </tr>

          <tr>
            <td style={{ padding: '10px' }}><strong>Frequências Esperadas</strong></td>
            <td style={{ padding: '10px' }}>
              {frequencias_esperadas.map((row, index) => (
                <div key={index}>{`[${row.join(", ")}]`}</div>
              ))}
            </td>
          </tr>

          {/* Resultado Significativo */}
          <tr>
            <td style={{ padding: '10px' }}><strong>Resultado Significativo</strong></td>
            <td style={{ padding: '10px' }}>{resultado_significativo ? 'Sim' : 'Não'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ChiSquareTable;
