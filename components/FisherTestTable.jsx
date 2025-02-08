import React from "react";

const FisherTestTable = ({ fisherResult }) => {
  const {
    metodo,
    valor_p,
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
            <th style={{ padding: "5px" }}>Métrica</th>
            <th style={{ padding: "5px" }}>Valor</th>
          </tr>
        </thead>
        <tbody>
          {/* Método */}
          <tr>
            <td style={{ padding: "5px" }}><strong>Método</strong></td>
            <td style={{ padding: "5px" }}>{metodo}</td>
          </tr>

          {/* Valor-p */}
          <tr>
            <td style={{ padding: "5px" }}><strong>Valor-p</strong></td>
            <td style={{ padding: "5px" }}>{valor_p}</td>
          </tr>

          {/* Resultado Significativo */}
          <tr>
            <td style={{ padding: "5px" }}><strong>Resultado Significativo</strong></td>
            <td style={{ padding: "5px" }}>{resultado_significativo ? "Sim" : "Não"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FisherTestTable;
