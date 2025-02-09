import React from "react";

const FrequencyTable = ({ title, data }) => {
  if (!data || !data.colunas || !data.linhas || !data.matriz) {
    return <p>Dados insuficientes para renderizar a tabela de frequências.</p>;
  }

  const { colunas, linhas, matriz } = data;

  return (
    <div>
      <h3>{title}</h3>
      <table
        style={{
          margin: "5px 0",
          borderCollapse: "collapse",
          width: "100%",
          textAlign: "center",
          border: "1px solid #ddd",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5", borderBottom: "1px solid #ddd" }}>
            <th style={{ padding: "5px" }}>Grupo</th>
            {colunas.map((col, index) => (
              <th key={index} style={{ padding: "5px" }}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha, rowIndex) => (
            <tr key={rowIndex}>
              <td style={{ padding: "5px", fontWeight: "bold" }}>{linha}</td>
              {matriz[rowIndex].map((value, colIndex) => (
                <td key={colIndex} style={{ padding: "5px" }}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FrequencyTable;
