import TableView from "../components/TableView";

export default function MainDownload({ filters }) {
  return (
    <div className="MainDownload">
      <div className="export">
        <button className="exportButton">Exportar para Xlsx</button>
      </div>
      {/* Só exibe a tabela se os filtros estiverem aplicados */}
      {filters ? (
        <div className="table">
          <TableView filters={filters} /> {/* Passa os filtros para a tabela */}
        </div>
      ) : (
        <p>Por favor, aplique os filtros para visualizar a tabela.</p>
      )}
    </div>
  );
}
