import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/TableView.module.css";
import { API_BASE_URL_PRD } from "../config"; // Importando a URL base

export default function TableView({ filters }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para controle de carregamento
  const [error, setError] = useState(null); // Estado para mensagens de erro

  useEffect(() => {
    const fetchData = async () => {
      if (filters) {
        setLoading(true);
        setError(null); // Limpa erros anteriores
        try {
          // Mapeia os filtros para os parâmetros esperados pela API
          const queryParams = new URLSearchParams({
            ano: filters.ano,
            regiao: filters.regiao,
            uf: filters.uf,
            municipio: filters.municipio,
            cat_adm: filters.catAdm,
            cod_ies: filters.ies,
            grp: filters.curso,
            presenca: 555,
            all: filters.all,
          }).toString();

          const response = await axios.get(
            `${API_BASE_URL_PRD}notas?${queryParams}`
          );
          setData(response.data); // Atualiza os dados da tabela
        } catch (err) {
          console.error("Erro ao buscar dados:", err);
          setError("Ocorreu um erro ao carregar os dados. Tente novamente.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [filters]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Carregando dados...</p>
      </div>
    );
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {/* Adicione as colunas dinamicamente com base nos dados */}
              {data.length > 0 &&
                Object.keys(data[0]).map((col) => <th key={col}>{col}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  {Object.values(item).map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="100%">Nenhum dado encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
