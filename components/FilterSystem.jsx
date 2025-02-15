import { useState } from "react";
import styles from "../styles/FilterSystem.module.css"; // Importe o CSS Module

const FilterSystem = () => {
  const [numFilters, setNumFilters] = useState(1); // Começa com 1 filtro
  const [filters, setFilters] = useState([{}]); // Inicializa o estado dos filtros com um filtro vazio
  const [error, setError] = useState(""); // Armazena a mensagem de erro

  const handleNumFiltersChange = (event) => {
    const newNumFilters = parseInt(event.target.value);
    setNumFilters(newNumFilters);

    // Ajuste o estado dos filtros conforme o número selecionado
    if (newNumFilters > filters.length) {
      setFilters([...filters, ...Array(newNumFilters - filters.length).fill({})]);
    } else {
      setFilters(filters.slice(0, newNumFilters));
    }

    // Limpar mensagem de erro quando o número de filtros for alterado
    setError("");
  };

  const handleFilterChange = (index, key, value) => {
    const newFilters = [...filters];
    newFilters[index] = {
      ...newFilters[index],
      [key]: value,
    };
    setFilters(newFilters);

    // Validar após cada alteração
    const validationError = validateFilters(newFilters);
    setError(validationError);
  };

  const validateFilters = (filters) => {
    let errorMessage = "";

    // Percorre os filtros e compara a lógica entre eles
    for (let i = 0; i < filters.length - 1; i++) {
      const currentFilter = filters[i];
      const nextFilter = filters[i + 1];

      // Certifica-se que ambos os valores são números válidos
      const currentValue = parseFloat(currentFilter.value1);
      const nextValue = parseFloat(nextFilter.value1);

      // Caso algum valor não seja válido, ignora a validação
      if (isNaN(currentValue) || isNaN(nextValue)) {
        continue;
      }

      // Verificação de consistência de operadores e valores
      const isValid = i === 0 || i === filters.length - 1
        ? checkOperatorLogic(currentFilter, nextFilter, currentValue, nextValue)
        : checkRangeLogic(currentFilter, nextFilter, i);

      if (!isValid) {
        errorMessage = `O valor do filtro ${i + 1} não pode ser combinado com o valor do filtro ${i + 2}.`;
        break;
      }
    }

    return errorMessage;
  };

  // Função para verificar a lógica de operadores entre filtros consecutivos
  const checkOperatorLogic = (currentFilter, nextFilter, currentValue, nextValue) => {
    switch (currentFilter.operator1) {
      case "<=":
        if (nextFilter.operator1 === ">=") {
          return currentValue <= nextValue;
        } else if (nextFilter.operator1 === "=") {
          return currentValue <= nextValue;
        } else if (nextFilter.operator1 === "<") {
          return currentValue < nextValue;
        } else if (nextFilter.operator1 === ">") {
          return currentValue < nextValue;
        }
        break;
      case ">=":
        if (nextFilter.operator1 === "<=") {
          return currentValue >= nextValue;
        } else if (nextFilter.operator1 === "=") {
          return currentValue >= nextValue;
        } else if (nextFilter.operator1 === "<") {
          return currentValue < nextValue;
        } else if (nextFilter.operator1 === ">") {
          return currentValue > nextValue;
        }
        break;
      case "=":
        if (nextFilter.operator1 === "<=") {
          return currentValue <= nextValue;
        } else if (nextFilter.operator1 === ">=") {
          return currentValue >= nextValue;
        } else if (nextFilter.operator1 === "<") {
          return currentValue < nextValue;
        } else if (nextFilter.operator1 === ">") {
          return currentValue > nextValue;
        }
        break;
      case "<":
        if (nextFilter.operator1 === ">=") {
          return currentValue < nextValue;
        } else if (nextFilter.operator1 === "=") {
          return currentValue < nextValue;
        } else if (nextFilter.operator1 === "<") {
          return currentValue < nextValue;
        } else if (nextFilter.operator1 === ">") {
          return currentValue < nextValue;
        }
        break;
      case ">":
        if (nextFilter.operator1 === "<=") {
          return currentValue > nextValue;
        } else if (nextFilter.operator1 === "=") {
          return currentValue > nextValue;
        } else if (nextFilter.operator1 === "<") {
          return currentValue > nextValue;
        } else if (nextFilter.operator1 === ">") {
          return currentValue > nextValue;
        }
        break;
      default:
        return true; // Caso o operador não seja tratado, consideramos válido
    }
    return true; // Caso não tenha lógica definida, consideramos válido
  };

  // Função para verificar a lógica de intervalo para filtros do meio
  const checkRangeLogic = (currentFilter, nextFilter, i) => {
    const currentValue1 = parseFloat(currentFilter.value1);
    const currentValue2 = parseFloat(currentFilter.value2);
    const nextValue1 = parseFloat(nextFilter.value1);
    const nextValue2 = parseFloat(nextFilter.value2);

    if (isNaN(currentValue1) || isNaN(currentValue2) || isNaN(nextValue1) || isNaN(nextValue2)) {
      return true; // Ignora a validação se os valores não forem números válidos
    }

    // O valor 1 do filtro do meio deve ser menor ou igual ao valor 2 do mesmo filtro
    if (currentValue1 > currentValue2) {
      return false; // Se o valor 1 for maior que o valor 2, é inválido
    }

    // O valor 2 do filtro anterior deve ser menor ou igual ao valor 1 do filtro seguinte
    if (i > 0) {
      const prevFilter = filters[i - 1];
      const prevValue = parseFloat(prevFilter.value1);
      if (prevValue > currentValue1) {
        return false;
      }
    }

    // A lógica de comparação entre filtros consecutivos
    if (nextValue1 < currentValue2) {
      return false; // O valor do próximo filtro deve ser maior ou igual ao valor 2 do filtro atual
    }

    return true;
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
        const isMiddleFilter = numFilters > 2 && index !== 0 && index !== filters.length - 1;

        return (
          <div key={index} className={styles["filter-row"]}>
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

      {/* Exibindo erro se houver */}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default FilterSystem;
