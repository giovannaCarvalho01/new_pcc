import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

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

  useEffect(() => {
    if (!filters) return; // Evita execução sem filtros

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/boxplot?${new URLSearchParams(filters)}`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados");
        }
        const result = await response.json();

        // Atualiza os estados com os dados retornados
        setData(result.valores); // Dados principais
        setOutliers(result.outliers); // Outliers explícitos
        setLimites(result.limites); // Limites do boxplot
      } catch (error) {
        console.error("Erro ao buscar os dados do backend:", error);
      }
    };

    fetchData();
  }, [filters]); // Refaz a busca sempre que os filtros mudarem

  // Verifica se os dados estão disponíveis antes de renderizar o gráfico
  if (!filters || data.length === 0 || !limites.q1) {
    return <div>Selecione os filtros para visualizar o gráfico.</div>; // Mensagem caso os filtros não sejam definidos
  }

  return (
    <div className="main">
      <div className="superiorAnalise">
        <div className="superiorSecao">
          <BoxPlotChart data={data} outliers={outliers} limites={limites} />
        </div>
      </div>
      <div className="inferiorAnalise"></div>
    </div>
  );
}
