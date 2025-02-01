import TableView from "../components/TableView";
import axios from "axios";
import { useState } from "react";

export default function MainDownload({ filters }) {
  const [isDownloading, setIsDownloading] = useState(false); // Estado para controlar o popup

  const handleDownload = async () => {
    if (!filters) {
      alert("Por favor, aplique os filtros antes de exportar.");
      return;
    }

    setIsDownloading(true); // Exibe o popup de carregamento

    try {
      // Mapeia os filtros para os parâmetros esperados pela API
      const queryParams = new URLSearchParams({
        ano: filters.ano,
        regiao: filters.regiao,
        uf: filters.uf,
        municipio: filters.municipio,
        cat_adm: filters.catAdm,
        cod_ies: filters.ies,
        grp: filters.curso,
        presenca: 555,
      }).toString();

      const response = await axios.get(`http://localhost:3001/notas/download?${queryParams}`, {
        responseType: "blob",
      });

      // Cria um link para download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `notas_${Date.now()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Erro ao exportar para Excel:", error);
      alert("Ocorreu um erro ao tentar exportar os dados. Tente novamente.");
    } finally {
      setIsDownloading(false); // Esconde o popup de carregamento
    }
  };

  return (
    <div className="MainDownload">
      <div className="export">
        <button className="exportButton" onClick={handleDownload}>
          Exportar para Xlsx
        </button>
      </div>
      {filters ? (
        <div className="table">
          <TableView filters={filters} />
        </div>
      ) : (
        <p>Por favor, aplique os filtros para visualizar a tabela.</p>
      )}

      {/* Popup de carregamento */}
      {isDownloading && (
        <div className="loadingPopup">
          <div className="loadingContent">
            <p>O arquivo está sendo gerado, aguarde...</p>
            <div className="spinner"></div>
          </div>
        </div>
      )}
    </div>
  );
}
