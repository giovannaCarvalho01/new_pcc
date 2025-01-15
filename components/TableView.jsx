import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/TableView.module.css";

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
            dsc_grp: filters.curso,
            presenca: 555,
          }).toString();

          const response = await axios.get(
            `http://localhost:3001/notas?${queryParams}`
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
    return <p className={styles.loading}>Carregando dados...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
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
  );
}
