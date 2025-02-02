import React from "react";

const FisherTestTable = ({ fisherResult }) => {
  const {
    metodo,
    valor_p,
    frequencias_esperadas,
    frequencias_observadas,
    resultado_significativo,
  } = fisherResult;

  return (
    <div>
      <table
        style={{
          margin: "20px auto",
          borderCollapse: "collapse",
          width: "100%",
          textAlign: "left",
          border: "1px solid #ddd",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5", borderBottom: "1px solid #ddd" }}>
            <th style={{ padding: "10px" }}>Métrica</th>
            <th style={{ padding: "10px" }}>Valor</th>
          </tr>
        </thead>
        <tbody>
          {/* Método */}
          <tr>
            <td style={{ padding: "10px" }}><strong>Método</strong></td>
            <td style={{ padding: "10px" }}>{metodo}</td>
          </tr>

          {/* Valor-p */}
          <tr>
            <td style={{ padding: "10px" }}><strong>Valor-p</strong></td>
            <td style={{ padding: "10px" }}>{valor_p}</td>
          </tr>

          {/* Frequências Observadas e Esperadas */}
          <tr>
            <td style={{ padding: "10px" }}><strong>Frequências Observadas</strong></td>
            <td style={{ padding: "10px" }}>
              {frequencias_observadas.map((row, index) => (
                <div key={index}>{`[${row.join(", ")}]`}</div>
              ))}
            </td>
          </tr>

          <tr>
            <td style={{ padding: "10px" }}><strong>Frequências Esperadas</strong></td>
            <td style={{ padding: "10px" }}>
              {frequencias_esperadas.map((row, index) => (
                <div key={index}>{`[${row.join(", ")}]`}</div>
              ))}
            </td>
          </tr>

          {/* Resultado Significativo */}
          <tr>
            <td style={{ padding: "10px" }}><strong>Resultado Significativo</strong></td>
            <td style={{ padding: "10px" }}>{resultado_significativo ? "Sim" : "Não"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FisherTestTable;
