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
    if (!filters) return;

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

  return (
    <div className="main">
      <div className="superiorAnalise">
        {/* Gráfico de Boxplot */}
        <div className="superiorSecao">
          {/* <BarChart /> */}
          <BoxPlotChart data={data} outliers={outliers} limites={limites} />
        </div>
      </div>
      <div className="inferiorAnalise"></div>
    </div>
  );
}
