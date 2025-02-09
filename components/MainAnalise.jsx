import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ChiSquareTable from "../components/ChiSquareTable"; // Componente para exibir o resultado
import FisherTestTable from "../components/FisherTestTable"; // Componente para exibir o Fisher Test
import { API_BASE_URL_PRD } from "../config"; // Importando a URL base
import FrequencyTable from "../components/FrequencyTable";
import Agrupamento from "../components/Agrupamento"; // Importando o novo componente Agrupamento
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
  const [isValid, setIsValid] = useState(true); // Flag para validação
  const [loading, setLoading] = useState(true); // Estado de carregamento

  // Função para validar os dados do Qui-Quadrado
  const validateChiSquareData = (chiSquareData) => {
    const { frequencias_esperadas } = chiSquareData;

    let belowFiveCount = 0;
    let totalFrequencias = 0;
    let belowOneCount = 0; // Variável para contar os valores abaixo de 1

    // Iterar sobre a matriz de frequências esperadas
    frequencias_esperadas.matriz.forEach((row) => {
      row.forEach((value) => {
        totalFrequencias += value; // Soma as frequências para o total
        if (value < 5) {
          belowFiveCount += 1; // Conta os valores abaixo de 5
        }
        if (value < 1) {
          belowOneCount += 1; // Conta os valores abaixo de 1
        }
      });
    });

    // Exibir valores para diagnóstico
    console.log("Total Frequências Esperadas: ", totalFrequencias);
    console.log("Valores abaixo de 5: ", belowFiveCount);
    console.log("Valores abaixo de 1: ", belowOneCount);

    // Condição para validar as regras:
    const isBelowFiveValid = belowFiveCount / totalFrequencias < 0.2; // Verifica se menos de 20% são abaixo de 5
    const isBelowOneValid = belowOneCount === 0; // Verifica se nenhum valor é inferior a 1

    // A validação é verdadeira se ambas as condições forem atendidas
    return isBelowFiveValid && isBelowOneValid;
  };

  useEffect(() => {
    if (!filters) return; // Evita execução sem filtros

    const fetchData = async () => {
      setLoading(true); // Define como carregando até completar a validação

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
          // Calcula a validação para o Qui-Quadrado
          const isValid = validateChiSquareData(chiSquareData);
          setIsValid(isValid); // Define se a regra foi atendida

          setChiSquareResult(chiSquareData); // Se for Qui-Quadrado
          setFisherResult(null); // Limpa o resultado do Fisher
        }
      } catch (error) {
        setError(error.message); // Atualiza o erro
        setShowErrorModal(true); // Exibe o modal
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchData();
  }, [filters]); // Refaz a busca sempre que os filtros mudarem

  // Função para fechar o modal
  const closeModal = () => {
    setShowErrorModal(false);
  };

  // Se o estado de carregamento estiver true, não renderiza nada
  if (loading) {
    return null; // Não renderiza nada enquanto estiver carregando
  }

  // Se a validação falhou, mostra o agrupamento em vez da mensagem de erro
  if (!isValid) {
    return (
      <div className="main">
        <Agrupamento frequenciasEsperadas={chiSquareResult?.frequencias_esperadas} />
      </div>
    );
  }

  // Verifica se os dados estão disponíveis antes de renderizar o gráfico
  if (!filters || data.length === 0 || !limites.q1 || !chiSquareResult) {
    return (
      <div className="main">
        <Agrupamento frequenciasEsperadas={chiSquareResult?.frequencias_esperadas} />
      </div>
    );
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
