import { useState, useEffect } from "react";
import styles from "../styles/Dropdown.module.css"; // Arquivo CSS modular

export default function DropdownFilter({ placeholder, queryParams, coluna, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseEndpoint = "http://localhost:3001/filter?";
  const endpointAno = "http://localhost:3001/anos";

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);

      const fullEndpoint =
        coluna === "ano" ? endpointAno : `${baseEndpoint}${queryParams}`;

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
