import React from "react";

const ChiSquareTable = ({ chiSquareResult, alfa, outliers }) => {
  const {
    qui2,
    valor_p,
    graus_de_liberdade,
    resultado_significativo,
  } = chiSquareResult;

  return (
    <div>
      <div className="fieldDescriptionContainer">
        <h3>Resultados do Qui-Quadrado: 
        {outliers && outliers.length > 0 && (
            <i className="infoIcon" title="Análise realizada com a exclusão do(s) outlier(s)."> i </i>
          )}
        </h3>
      </div>
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
          <tr>
            <td style={{ padding: "5px" }}><strong>Qui-Quadrado</strong></td>
            <td style={{ padding: "5px" }}>{qui2}</td>
          </tr>
          <tr>
            <td style={{ padding: "5px" }}><strong>Valor-p</strong></td>
            <td style={{ padding: "5px" }}>{valor_p.toFixed(8)}</td>
          </tr>
          <tr>
            <td style={{ padding: "5px" }}><strong>Graus de Liberdade</strong></td>
            <td style={{ padding: "5px" }}>{graus_de_liberdade}</td>
          </tr>
          <tr>
            <td style={{ padding: "5px" }}><strong>Resultado Significativo</strong></td>
            <td style={{ padding: "5px" }}>
              {resultado_significativo
                ? `O p-valor ${valor_p.toFixed(8)} é menor que o alfa (${alfa}), portanto, a nota do Enade é dependente do agrupamento realizado.`
                : `O p-valor (${valor_p.toFixed(8)}) é maior que o alfa (${alfa}), portanto, a nota do Enade é independente do agrupamento realizado.`}
            </td>

          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ChiSquareTable;
