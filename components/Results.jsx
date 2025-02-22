import dynamic from "next/dynamic";
import ChiSquareTable from "../components/ChiSquareTable";
import FisherTestTable from "../components/FisherTestTable";
import FrequencyTable from "../components/FrequencyTable";

// Carrega os componentes apenas no cliente
const BoxPlotChart = dynamic(() => import("../components/BoxPlotChart"), {
  ssr: false,
});

export default function Results({ data, outliers, limites, chiSquareResult, fisherResult, alfa }) {
  return (
    <div className="main">
      <h3>Gráfico de Boxplot:</h3>
      <div className="superiorAnalise">
        <BoxPlotChart data={data} outliers={outliers} limites={limites} />
      </div>
      <div className="inferiorAnalise">
        {chiSquareResult && (
          <ChiSquareTable
            chiSquareResult={chiSquareResult} // Passa o objeto completo para o componente
            alfa={alfa}
            outliers={outliers}
          />
        )}
        {fisherResult && (
          <FisherTestTable
            fisherResult={fisherResult} // Passa o objeto completo para o componente Fisher
            alfa={alfa}
            outliers={outliers}
          />
        )}
        {chiSquareResult && (
          <>
            <FrequencyTable
              title="Frequências Observadas"
              data={chiSquareResult.frequencias_observadas}
            />
            <FrequencyTable
              title="Frequências Esperadas"
              data={chiSquareResult.frequencias_esperadas}
            />
          </>
        )}
        {fisherResult && (
          <>
            <FrequencyTable
              title="Frequências Observadas (Fisher)"
              data={fisherResult.frequencias_observadas}
            />
            <FrequencyTable
              title="Frequências Esperadas (Fisher)"
              data={fisherResult.frequencias_esperadas}
            />
          </>
        )}
      </div>
    </div>
  );
}
