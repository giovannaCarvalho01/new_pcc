import PieChartComponent from "../components/PieChart";
import LineChart from "../components/LineChart";

export default function Main({ filters }) {
  // Defina a variável que você quer passar para o backend (ex: "sexo", "curso")
  // const variavel = "sexo"; // Aqui você pode fazer a variável ser dinâmica, por exemplo, por meio de um select no frontend

  return (
    <div className="main">
      {filters ? (
        <>
          <div className="superior">
            <PieChartComponent filters={filters} variavel={'sexo_dsc'} />
            <PieChartComponent filters={filters} variavel={'raca_dsc'} />
            <PieChartComponent filters={filters} variavel={'cotista_dsc'} />
            <PieChartComponent filters={filters} variavel={'estado_civil_dsc'} />
          </div>
          <div className="inferior" style={{ width: "100%" }}>
            <LineChart filters={filters} />
          </div>
        </>
      ) : (
        <div className="placeholder">
          <p>Por favor, aplique os filtros para visualizar os gráficos.</p>
        </div>
      )}
    </div>
  );
}
