import { useState, useEffect } from "react";
import styles from "../styles/Dropdown.module.css"; // Arquivo CSS modular
import { API_BASE_URL_PRD } from "../config"; // Importando a URL base

export default function DropdownFilter({ placeholder, queryParams, coluna, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseEndpoint = `${API_BASE_URL_PRD}filter?`;
  const endpointAno = `${API_BASE_URL_PRD}anos`;
  const endpointVariavel = `${API_BASE_URL_PRD}variavel/`;


  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);

      let fullEndpoint;

      let fetchedItems = [];

      // Se a coluna for "alfa", use um conjunto fixo de valores
      if (coluna === "alfa") {
        fetchedItems = [
          { value: "0.001", label: "0.001" },
          { value: "0.01", label: "0.01" },
          { value: "0.02", label: "0.02" },
          { value: "0.05", label: "0.05" },
          { value: "0.10", label: "0.10" },
        ];
        setItems(fetchedItems);
        setLoading(false); // Não precisa aguardar carregamento, já temos os dados
        return;
      }
      
      // Mudando o endpoint dependendo do valor de "coluna"
      if (coluna === "ano") {
        fullEndpoint = endpointAno; // Endpoint para anos
      } else if (coluna === "variavel") {
        fullEndpoint = `${endpointVariavel}${queryParams}`; // Endpoint para variáveis com queryParams
      } else {
        fullEndpoint = `${baseEndpoint}${queryParams}`; // Endpoint padrão
      }

      try {
        const response = await fetch(fullEndpoint);
        if (!response.ok) {
          throw new Error(`Erro ao buscar os dados: ${response.statusText}`);
        }
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [queryParams, coluna]);

  const handleSelect = (value) => {
    setSelectedItem(value);
    setIsOpen(false);
    if (onSelect) {
      onSelect(value);
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedItem ? selectedItem : placeholder}
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          {loading && <div className={styles.loading}>Carregando...</div>}
          {error && <div className={styles.error}>{error}</div>}
          {!loading && !error && items.length === 0 && (
            <div className={styles.noItems}>Nenhum item encontrado</div>
          )}
          {!loading && !error && (
            <ul>
              {items.map((item, index) => {
                if (typeof item !== "object") return null;
                const firstKey = Object.keys(item)[0];
                const displayValue = firstKey ? item[firstKey] : "Valor desconhecido";
                return (
                  <li
                    key={index}
                    onClick={() => handleSelect(displayValue)}
                    className={styles.dropdownItem}
                  >
                    {displayValue}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
