import { useState, useEffect } from "react";
import styles from "../styles/Dropdown.module.css"; // Arquivo CSS modular
import { API_BASE_URL_PRD } from "../config"; // Importando a URL base

export default function DropdownFilter({
  placeholder,
  queryParams,
  coluna,
  onSelect,
  selectedItem: propSelectedItem,
  initialSelectedIndex, // Adicionamos o índice para inicializar um valor
  isOpened, // Novo: Prop para controlar se o dropdown está aberto
  onToggle, // Novo: Função para notificar o componente pai sobre o clique
}) {
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

      // Se a coluna for "notas", use um conjunto fixo de valores
      if (coluna === "notas") {
        fetchedItems = [
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4", label: "4" },
          { value: "5", label: "5" },
        ];
        setItems(fetchedItems);
        setLoading(false); // Não precisa aguardar carregamento, já temos os dados
        return;
      }

      // Caso especial para operadores
      if (coluna === "operador") {
        fetchedItems = [
          { value: "<=", label: "<=" },
          { value: ">", label: ">" },
          { value: "<", label: "<" },
          { value: ">=", label: ">=" },
        ];
        setItems(fetchedItems);
        setLoading(false); // Não precisa carregar de um endpoint
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

  useEffect(() => {
    // Se o selectedItem do pai for null, resetamos o selectedItem local
    if (propSelectedItem === null) {
      setSelectedItem(null);
    }
  }, [propSelectedItem]);  // Dependência para monitorar quando o valor de selectedItem for null

  useEffect(() => {
    // Se coluna for "operador", podemos definir um valor selecionado inicial com base no índice
    if (coluna === "operador" && initialSelectedIndex != null && items.length > 0) {
      setSelectedItem(items[initialSelectedIndex]?.value);
    }
  }, [coluna, initialSelectedIndex, items]);

  const handleSelect = (value) => {
    setSelectedItem(value);
    if (onSelect) {
      onSelect(value);
    }
    onToggle(); // Fecha o dropdown após a seleção
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.dropdownButton}
        onClick={onToggle} // Usando a função onToggle passada pelo pai
      >
        {selectedItem ? selectedItem : placeholder}
      </button>
      {isOpened && ( // Usando isOpened para controlar a visibilidade
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
                    onClick={() => handleSelect(displayValue)} // Chama handleSelect diretamente
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