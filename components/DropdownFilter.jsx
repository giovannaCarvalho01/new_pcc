import { useState, useEffect } from "react";
import styles from "../styles/Dropdown.module.css"; // Arquivo CSS modular

export default function DropdownFilter({ placeholder, queryParams, coluna, onSelect }) {
  const [isOpen, setIsOpen] = useState(false); // Controle de abertura do dropdown
  const [selectedItem, setSelectedItem] = useState(null); // Item selecionado
  const [items, setItems] = useState([]); // Lista de itens a ser carregada da API
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro

  // Parte fixa dos endpoints
  const baseEndpoint = "http://localhost:3001/filter?";
  const endpointAno = "http://localhost:3001/anos";

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);

      // Escolhe o endpoint com base na prop `coluna`
      const fullEndpoint =
        coluna === "ano" ? endpointAno : `${baseEndpoint}${queryParams}`;

      try {
        const response = await fetch(fullEndpoint);
        if (!response.ok) {
          throw new Error(`Erro ao buscar os dados: ${response.statusText}`);
        }
        const data = await response.json();

        // Ajusta a estrutura dependendo do endpoint
        const parsedItems = coluna === "ano" ? data.map((item) => item.ano) : data;

        setItems(parsedItems); // Atualiza os itens
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [queryParams, coluna]); // Recarrega os dados quando `queryParams` ou `coluna` mudar

  const handleSelect = (item) => {
    setSelectedItem(item); // Define o item selecionado
    setIsOpen(false); // Fecha o dropdown
    if (onSelect) {
      onSelect(item); // Retorna o valor selecionado para o componente pai
    }
  };

  return (
    <div className={styles.container}>
      {/* Elemento principal */}
      <button
        className={styles.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedItem ? selectedItem : placeholder}
      </button>
      {/* Dropdown */}
      {isOpen && (
        <div className={styles.dropdown}>
          {loading && <div className={styles.loading}>Carregando...</div>}
          {error && <div className={styles.error}>{error}</div>}
          {!loading && !error && items.length === 0 && (
            <div className={styles.noItems}>Nenhum item encontrado</div>
          )}
          {!loading && !error && (
            <ul>
              {items.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(item)}
                  className={styles.dropdownItem}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
