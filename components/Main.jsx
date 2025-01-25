import PieChartComponent from "../components/PieChart";
import LineChart from "../components/LineChart";

export default function Main({ filters }) {
  const datas = [
    { name: "Chrome", value: 275 },
    { name: "Safari", value: 200 },
    { name: "Firefox", value: 287 },
    { name: "Edge", value: 173 },
    { name: "Other", value: 190 },
  ];

  return (
    <div className="main">
      {filters ? (
        <>
          <div className="superior">
            <PieChartComponent data={datas} />
            <PieChartComponent data={datas} />
            <PieChartComponent data={datas} />
          </div>
          <div className="inferior" style={{ width: "100%" }}>
            <LineChart filters={filters} /> {/* Passando os filtros para o LineChart */}
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
