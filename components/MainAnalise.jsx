import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ChiSquareTable from "../components/ChiSquareTable"; // Componente para exibir o resultado

// Carrega os componentes apenas no cliente
const BoxPlotChart = dynamic(() => import("../components/BoxPlotChart"), {
  ssr: false,
});

const BarChart = dynamic(() => import("../components/BarChart"), {
  ssr: false,
});

export default function MainAnalise({ filters }) {
  const [data, setData] = useState([]); // Dados principais
  const [outliers, setOutliers] = useState([]); // Outliers separados
  const [limites, setLimites] = useState({}); // Limites do boxplot
  const [chiSquareResult, setChiSquareResult] = useState(null); // Resultado do teste Qui-Quadrado

  useEffect(() => {
    if (!filters) return; // Evita execução sem filtros

    const fetchData = async () => {
      try {
        // Chamada ao endpoint para BoxPlot
        const response = await fetch(
          `http://localhost:3001/boxplot?${new URLSearchParams(filters)}`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados");
        }
        const result = await response.json();

        // Atualiza os estados com os dados retornados para BoxPlot
        setData(result.valores);
        setOutliers(result.outliers);
        setLimites(result.limites);

        // Chamada ao endpoint para Qui-Quadrado
        const chiSquareResponse = await fetch(
          `http://localhost:3001/quiquadrado?variavel=sexo&presenca=555&${new URLSearchParams(filters)}`
        );
        if (!chiSquareResponse.ok) {
          throw new Error("Erro ao calcular Qui-Quadrado");
        }
        const chiSquareData = await chiSquareResponse.json();
        setChiSquareResult(chiSquareData); // Atualiza o resultado do Qui-Quadrado
      } catch (error) {
        console.error("Erro ao buscar os dados do backend:", error);
      }
    };

    fetchData();
  }, [filters]); // Refaz a busca sempre que os filtros mudarem

  // Verifica se os dados estão disponíveis antes de renderizar o gráfico
  if (!filters || data.length === 0 || !limites.q1) {
    return <div>Selecione os filtros para visualizar o gráfico.</div>;
  }

  return (
    <div className="main">
      <div className="superiorAnalise">
        <div className="superiorSecao">
          <BoxPlotChart data={data} outliers={outliers} limites={limites} />
          {chiSquareResult && (
          <ChiSquareTable
            chiSquareResult={chiSquareResult} // Passa o objeto completo para o componente
          />
          )}
        </div>
      </div>
      
   </div>
  );
}
