import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Agrupamento from "../components/Agrupamento";
import Results from "../components/Results";
import { API_BASE_URL_PRD } from "../config";

const MainAnalise = ({ filters }) => {
  const [data, setData] = useState([]);
  const [outliers, setOutliers] = useState([]);
  const [limites, setLimites] = useState({});
  const [chiSquareResult, setChiSquareResult] = useState(null);
  const [fisherResult, setFisherResult] = useState(null);
  const [error, setError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isValid, setIsValid] = useState(true); // Flag para validações gerais
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Nova validação da regra de Siegel
  const validateSiegelConditions = (matrix) => {
    let belowFiveCount = 0;
    let belowOneCount = 0;
    const totalCells = matrix.length * matrix[0].length;

    matrix.forEach((row) => {
      row.forEach((cell) => {
        if (cell < 1) belowOneCount++;
        if (cell < 5) belowFiveCount++;
      });
    });

    return belowOneCount === 0 && belowFiveCount / totalCells <= 0.2;
  };

  useEffect(() => {
    if (!filters) return;
  
    const fetchData = async () => {
      setLoading(true);
  
      // Reseta os estados antes de buscar os novos dados
      setData([]);
      setOutliers([]);
      setLimites({});
      setChiSquareResult(null);
      setFisherResult(null);
      setIsValid(true);
  
      try {
        const response = await fetch(`${API_BASE_URL_PRD}boxplot?${new URLSearchParams(filters)}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Erro ao buscar os dados do BoxPlot");
        }
        const result = await response.json();
  
        setData(result.valores);
        setOutliers(result.outliers);
        setLimites(result.limites);
  
        const chiSquareResponse = await fetch(
          `${API_BASE_URL_PRD}quiquadrado?presenca=555&${new URLSearchParams(filters)}`
        );
        if (!chiSquareResponse.ok) {
          const chiSquareErrorData = await chiSquareResponse.json();
          throw new Error(chiSquareErrorData.message || "Erro ao calcular Qui-Quadrado");
        }
        const chiSquareData = await chiSquareResponse.json();
  
        if (chiSquareData.metodo === "Chi-Square Test") {
          const siegelIsValid = validateSiegelConditions(
            chiSquareData.frequencias_esperadas.matriz
          );
          const isBelowFiveValid =
            chiSquareData.frequencias_esperadas.matriz.flat().filter((x) => x < 5).length /
              chiSquareData.frequencias_esperadas.matriz.flat().length <=
            0.2;
          const isBelowOneValid =
            chiSquareData.frequencias_esperadas.matriz.flat().filter((x) => x < 1).length === 0;
  
          setIsValid(siegelIsValid && isBelowFiveValid && isBelowOneValid);
          setChiSquareResult(chiSquareData);
          setFisherResult(null);
        } else if (chiSquareData.metodo === "Fisher Exact Test") {
          setFisherResult(chiSquareData);
          setChiSquareResult(null);
        }
      } catch (error) {
        setError(error.message);
        setShowErrorModal(true);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [filters]);
  

  const closeModal = () => {
    setShowErrorModal(false);
  };

  if (loading) return null;

  if (showErrorModal) {
    return (
      <div className="modalOverlay">
        <div className="modalContent">
          <h2>Erro</h2>
          <p>{error}</p>
          <button onClick={closeModal}>Fechar</button>
        </div>
      </div>
    );
  }

  // Verifica todas as condições antes de exibir o Agrupamento
  if (
    chiSquareResult?.frequencias_esperadas.matriz &&
    (chiSquareResult.frequencias_esperadas.matriz.length > 1 || isValid)
  ) {
    return (
      <div className="main">
    <div className="main">
      <div className="explanation">
        <h3>Sobre o teste Qui-Quadrado</h3>
        {isExpanded && (
          <div className="content">
            <p>
              O teste de Qui-Quadrado (𝜒2) é um teste estatístico usado para
              avaliar se existe uma associação significativa entre variáveis
              categóricas ou se a distribuição observada dos dados difere de
              uma distribuição esperada. O teste pode ser aplicado apenas
              quando as seguintes condições são atendidas:
            </p>
            <ul>
              <li>
                1. O número de células com frequência esperada inferior a 5
                deve ser inferior a 20% do total de células.
              </li>
              <li>
                2. Nenhuma célula pode ter uma frequência esperada inferior a
                1.
              </li>
            </ul>
            <p>
              Caso essas condições não sejam atendidas com os dados na forma
              original, o pesquisador deve considerar combinar categorias
              adjacentes para aumentar as frequências esperadas nas células.
            </p>
            <p>
              <strong>Exemplo:</strong> Uma alternativa seria combinar as
              categorias "Concordo", "Concordo Parcialmente" e "Concordo
              Totalmente", ou "Discordo", "Discordo Parcialmente" e "Discordo
              Totalmente", a fim de adequar os dados para o teste [Siegel,
              1975].
            </p>
          </div>
        )}
        <button onClick={toggleExpand} className="toggle-button">
          {isExpanded ? "Recolher" : "Expandir"}
        </button>
      </div>
    </div>
        <Agrupamento frequenciasEsperadas={chiSquareResult.frequencias_esperadas} 
        frequenciasObservadas={chiSquareResult.frequencias_observadas}
        data={data}
        outliers={outliers}
        limites={limites}
        alfa={filters?.alfa}
        />
      </div>
    );
  }

  if (chiSquareResult || fisherResult) {
    return (
      <Results
        data={data}
        outliers={outliers}
        limites={limites}
        chiSquareResult={chiSquareResult}
        fisherResult={fisherResult}
      />
    );
  }

  return null;
};

export default MainAnalise;
