import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ChiSquareTable from "../components/ChiSquareTable"; // Componente para exibir o resultado
import FisherTestTable from "../components/FisherTestTable"; // Componente para exibir o Fisher Test
import { API_BASE_URL_PRD } from "../config"; // Importando a URL base
import FrequencyTable from "../components/FrequencyTable";
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
  const [fisherResult, setFisherResult] = useState(null); // Resultado do Fisher
  const [error, setError] = useState(null); // Estado para mensagem de erro
  const [showErrorModal, setShowErrorModal] = useState(false); // Controla a exibição do modal

  useEffect(() => {
    if (!filters) return; // Evita execução sem filtros

    const fetchData = async () => {
      try {
        // Chamada ao endpoint para BoxPlot
        const response = await fetch(
          `${API_BASE_URL_PRD}boxplot?${new URLSearchParams(filters)}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Erro ao buscar os dados do BoxPlot");
        }
        const result = await response.json();

        // Atualiza os estados com os dados retornados para BoxPlot
        setData(result.valores);
        setOutliers(result.outliers);
        setLimites(result.limites);

        // Chamada ao endpoint para Qui-Quadrado
        const chiSquareResponse = await fetch(
          `${API_BASE_URL_PRD}quiquadrado?presenca=555&${new URLSearchParams(filters)}`
        );
        if (!chiSquareResponse.ok) {
          const chiSquareErrorData = await chiSquareResponse.json();
          throw new Error(chiSquareErrorData.message || "Erro ao calcular Qui-Quadrado");
        }
        const chiSquareData = await chiSquareResponse.json();
        
        // Verificar se o resultado é Fisher ou Qui-Quadrado
        if (chiSquareData.metodo === "Fisher Exact Test") {
          setFisherResult(chiSquareData); // Se for Fisher
          setChiSquareResult(null); // Limpa o resultado do Qui-Quadrado
        } else if (chiSquareData.metodo === "Chi-Square Test") {
          setChiSquareResult(chiSquareData); // Se for Qui-Quadrado
          setFisherResult(null); // Limpa o resultado do Fisher
        }
      } catch (error) {
        setError(error.message); // Atualiza o erro
        setShowErrorModal(true); // Exibe o modal
      }
    };

    fetchData();
  }, [filters]); // Refaz a busca sempre que os filtros mudarem

  // Função para fechar o modal
  const closeModal = () => {
    setShowErrorModal(false);
  };

  // Verifica se os dados estão disponíveis antes de renderizar o gráfico
  if (!filters || data.length === 0 || !limites.q1) {
    return <div>Selecione os filtros para visualizar o gráfico.</div>;
  }

  return (
    <div className="main">
      <div className="superiorAnalise">
          <BoxPlotChart data={data} outliers={outliers} limites={limites} />
          {chiSquareResult && (
            <ChiSquareTable
              chiSquareResult={chiSquareResult} // Passa o objeto completo para o componente
            />
          )}
          {fisherResult && (
            <FisherTestTable
              fisherResult={fisherResult} // Passa o objeto completo para o componente Fisher
            />
          )}
      </div>
      <div className="inferiorAnalise">
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

      {/* Modal de erro */}
      {showErrorModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2>Erro</h2>
            <p>{error}</p>
            <button onClick={closeModal}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}
