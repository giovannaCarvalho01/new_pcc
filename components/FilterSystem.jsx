import { useState } from "react";
import styles from "../styles/FilterSystem.module.css"; // Importe o CSS Module

const FilterSystem = () => {
  const [numFilters, setNumFilters] = useState(1); // Começa com 1 filtro
  const [filters, setFilters] = useState([{}]); // Inicializa o estado dos filtros com um filtro vazio

  const handleNumFiltersChange = (event) => {
    const newNumFilters = parseInt(event.target.value);
    setNumFilters(newNumFilters);

    // Ajuste o estado dos filtros conforme o número selecionado
    if (newNumFilters > filters.length) {
      setFilters([...filters, ...Array(newNumFilters - filters.length).fill({})]);
    } else {
      setFilters(filters.slice(0, newNumFilters));
    }
  };

  const handleFilterChange = (index, key, value) => {
    const newFilters = [...filters];
    newFilters[index] = {
      ...newFilters[index],
      [key]: value,
    };
    setFilters(newFilters);
  };

  return (
    <div className={styles.container}>
      <div>
        <label className={styles.label}>
          Quantidade de filtros:
          <div className={styles.inputWrapper}>
            <button 
              className={styles.arrowButton} 
              onClick={() => handleNumFiltersChange({ target: { value: numFilters - 1 } })}
              disabled={numFilters <= 1} // Desabilita o botão de decremento se for 1
            >
              &lt;
            </button>
            <input
              className={styles.input}
              type="number"
              value={numFilters}
              onChange={handleNumFiltersChange}
              min="1"
              step="1"
            />
            <button 
              className={styles.arrowButton} 
              onClick={() => handleNumFiltersChange({ target: { value: numFilters + 1 } })}
            >
              &gt;
            </button>
          </div>
        </label>
      </div>

      {filters.map((filter, index) => {
        // Se o filtro for o primeiro ou o último, terá apenas 1 operador e 1 valor
        const isMiddleFilter = numFilters > 2 && index !== 0 && index !== filters.length - 1;

        return (
          <div key={index} className={styles["filter-row"]}>
            {/* Operador e valor para o primeiro ou último filtro */}
            <div>
              <label className={styles.label}>Operador 1</label>
              <select
                className={styles.select}
                value={filter.operator1 || "="}
                onChange={(e) =>
                  handleFilterChange(index, "operator1", e.target.value)
                }
              >
                <option value="<=">&lt;=</option>
                <option value=">=">&gt;=</option>
                <option value="=">=</option>
                <option value="<">&lt;</option>
                <option value=">">&gt;</option>
              </select>
            </div>

            <div>
              <label className={styles.label}>Valor 1</label>
              <input
                className={styles.input}
                type="number"
                value={filter.value1 || ""}
                onChange={(e) =>
                  handleFilterChange(index, "value1", e.target.value)
                }
              />
            </div>

            {/* Se for o filtro do meio, adicionar o segundo operador e valor */}
            {isMiddleFilter && (
              <>
                <div>
                  <label className={styles.label}>Operador 2</label>
                  <select
                    className={styles.select}
                    value={filter.operator2 || "="}
                    onChange={(e) =>
                      handleFilterChange(index, "operator2", e.target.value)
                    }
                  >
                    <option value="<=">&lt;=</option>
                    <option value=">=">&gt;=</option>
                    <option value="=">=</option>
                    <option value="<">&lt;</option>
                    <option value=">">&gt;</option>
                  </select>
                </div>

                <div>
                  <label className={styles.label}>Valor 2</label>
                  <input
                    className={styles.input}
                    type="number"
                    value={filter.value2 || ""}
                    onChange={(e) =>
                      handleFilterChange(index, "value2", e.target.value)
                    }
                  />
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FilterSystem;
