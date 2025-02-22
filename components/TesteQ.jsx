import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Agrupamento from "./Agrupamento";
import Results from "./Results";
import { API_BASE_URL_PRD } from "../config";

const TesteQ = ({ filters }) => {
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

  if (chiSquareResult || fisherResult) {
    return (
      <Results
        data={data}
        outliers={outliers}
        limites={limites}
        chiSquareResult={chiSquareResult}
        fisherResult={fisherResult}
        alfa={filters.alfa}
      />
    );
  }

  return null;
};

export default TesteQ;
