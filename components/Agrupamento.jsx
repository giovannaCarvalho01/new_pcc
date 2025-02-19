import React, { useState, useEffect } from "react";
import styles from "../styles/Agrupamento.module.css";
import jstat from "jstat"; // Importando a biblioteca jstat
import ChiSquareTable from "../components/ChiSquareTable";
import dynamic from "next/dynamic";


const Agrupamento = ({ frequenciasEsperadas, frequenciasObservadas, data,  outliers, limites, alfa}) => {
  const [numGroups, setNumGroups] = useState(1);
  const [variables, setVariables] = useState([]);
  const [groups, setGroups] = useState({ group1: [] });
  const [selectedVariable, setSelectedVariable] = useState(null);
  const [newMatrix, setNewMatrix] = useState([]);
  const [newObservedMatrix, setNewObservedMatrix] = useState([]);
  const [chiSquareResults, setChiSquareResults] = useState(null);
  const [pValue, setPValue] = useState(null); // Novo estado para o p-valor
  const [errorMessage, setErrorMessage] = useState(null);
  const [warningMessage, setWarningMessage] = useState(null);


  const BoxPlotChart = dynamic(() => import("../components/BoxPlotChart"), {
    ssr: false,
  });
  

  useEffect(() => {
    if (frequenciasEsperadas && frequenciasEsperadas.linhas) {
      setVariables(frequenciasEsperadas.linhas);
      setGroups({ group1: [...frequenciasEsperadas.linhas] });
    }
  }, [frequenciasEsperadas]);

  // Substituição da chamada antiga para `calculateGroupedMatrix`
  useEffect(() => {
    if (Object.keys(groups).length > 1) {
      calculateGroupedMatrixByRows(); // Nova função chamada aqui
    }
  }, [groups]);

  // Função para verificar a regra do "concordo" e "discordo"
  const checkForConcordoDiscordo = (updatedGroups) => {
    let warning = false;
    Object.values(updatedGroups).forEach((groupVariables) => {
      const hasConcordo = groupVariables.some((variable) => variable.toLowerCase().startsWith("concordo"));
      const hasDiscordo = groupVariables.some((variable) => variable.toLowerCase().startsWith("discordo"));

      if (hasConcordo && hasDiscordo) {
        warning = true;
      }
    });
    return warning;
  };

  const handleNumGroupsChange = (e) => {
    const newNumGroups = parseInt(e.target.value, 10);
    const maxGroups = variables.length;
  
    if (newNumGroups > maxGroups) {
      setNumGroups(maxGroups);
      alert(`O número máximo de agrupamentos é ${maxGroups} devido ao número de variáveis.`);
    } else {
      setNumGroups(newNumGroups);
    }

    // Limpar mensagem de erro se a quantidade de agrupamentos for 2 ou mais
    if (newNumGroups > 1) {
      setErrorMessage(null);
    }
    
    setGroups((prevGroups) => {
      const updatedGroups = { ...prevGroups };
  
      for (let i = Object.keys(updatedGroups).length + 1; i <= newNumGroups; i++) {
        updatedGroups[`group${i}`] = [];
      }
  
      if (newNumGroups < Object.keys(updatedGroups).length) {
        const groupsToRemove = Object.keys(updatedGroups).slice(newNumGroups);
        groupsToRemove.forEach((group) => {
          updatedGroups.group1 = [...updatedGroups.group1, ...updatedGroups[group]];
          delete updatedGroups[group];
        });
      }
  
      setNewMatrix([]);
      setNewObservedMatrix([]);
      setChiSquareResults(null);
      setPValue(null);
      
      return updatedGroups;
    });
  };

  const handleVariableClick = (variable) => {
    setSelectedVariable(variable);
  };

  const moveToGroup = (targetGroup) => {
    if (selectedVariable) {
      setGroups((prevGroups) => {
        const updatedGroups = { ...prevGroups };

        Object.keys(updatedGroups).forEach((group) => {
          updatedGroups[group] = updatedGroups[group].filter((item) => item !== selectedVariable);
        });

        updatedGroups[targetGroup].push(selectedVariable);
        setSelectedVariable(null);

        const isValid = validateGroups(updatedGroups);
        const isWarning = checkForConcordoDiscordo(updatedGroups);

        setWarningMessage(isWarning ? "Aviso: Não é recomendado adicionar variáveis diferentes no mesmo grupo." : null);
        setErrorMessage(isValid ? null : "Todas as variáveis devem ser distribuídas em mais de um grupo!");

        return updatedGroups;
      });
    }
  };

  const validateGroups = (updatedGroups) => {
    const groupEntries = Object.entries(updatedGroups);

    for (const [, variablesInGroup] of groupEntries) {
      if (variablesInGroup.length === 0) {
        return false;
      }
    }

    return true;
  };

  // Ajuste principal: lógica de agrupamento por linhas
  const calculateGroupedMatrixByRows = () => {
    if (!frequenciasEsperadas || !frequenciasEsperadas.matriz) return;

    const groupedMatrix = Object.keys(groups).map((groupKey) => {
      const groupVariables = groups[groupKey];
      const relevantRowIndexes = groupVariables.map((variable) =>
        frequenciasEsperadas.linhas.indexOf(variable)
      );

      return frequenciasEsperadas.matriz[0].map((_, colIndex) =>
        relevantRowIndexes.reduce((sum, rowIndex) => sum + frequenciasEsperadas.matriz[rowIndex][colIndex], 0)
      );
    });

    setNewMatrix(groupedMatrix);

    if (frequenciasObservadas) {
      const groupedObservedMatrix = Object.keys(groups).map((groupKey) => {
        const groupVariables = groups[groupKey];
        const relevantRowIndexes = groupVariables.map((variable) =>
          frequenciasObservadas.linhas.indexOf(variable)
        );

        return frequenciasObservadas.matriz[0].map((_, colIndex) =>
          relevantRowIndexes.reduce((sum, rowIndex) => sum + frequenciasObservadas.matriz[rowIndex][colIndex], 0)
        );
      });

      setNewObservedMatrix(groupedObservedMatrix);
    }
  };


  const calculateChiSquare = () => {
    if (!newMatrix.length || !newObservedMatrix.length) return;
  
    // Validação da regra de Siegel
    const siegelValid = validateSiegelConditions(newMatrix);
    if (!siegelValid) {
      setErrorMessage(
        "A regra de Siegel não foi atendida: pelo menos uma célula tem valor esperado < 1 ou mais de 20% das células têm valor esperado < 5."
      );
      return; // Interrompe o cálculo
    }
  
    let chi2 = 0;
    for (let i = 0; i < newObservedMatrix.length; i++) {
      for (let j = 0; j < newObservedMatrix[i].length; j++) {
        if (newMatrix[i][j] !== 0) {
          chi2 += Math.pow(newObservedMatrix[i][j] - newMatrix[i][j], 2) / newMatrix[i][j];
        }
      }
    }
  
    const dof = (newObservedMatrix.length - 1) * (newObservedMatrix[0].length - 1);
  
    // Calcular o p-valor usando a distribuição Qui-Quadrado com jstat
    const p = 1 - jstat.chisquare.cdf(chi2, dof);
  
    setChiSquareResults({ chi2, dof });
    setPValue(p);
    setErrorMessage(null); // Limpa mensagens de erro
  };
  
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
  

  const handleSubmit = () => {
    if (Object.keys(groups).length === 1) {
      setErrorMessage("É necessário ter mais de um agrupamento para validar.");
      return; // Interrompe o processo
    }

    const isValid = validateGroups(groups);
    setErrorMessage(isValid ? null : "Todas as variáveis devem ser distribuídas em mais de um grupo!");
  
    if (isValid) {
      calculateGroupedMatrixByRows(); // Gera as matrizes agrupadas
      calculateChiSquare(); // Calcula o qui-quadrado, incluindo validação da regra de Siegel
    }
  };
  
  const getInitials = (str) => {
    return str
      .split(" ") // Divide a string em palavras
      .map((word) => word[0]?.toUpperCase()) // Pega a primeira letra de cada palavra
      .join(""); // Junta as iniciais
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Agrupamento de Variáveis</h1>
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label}>Quantidade de agrupamentos:</label>
        <input
          type="number"
          min="1"
          value={numGroups}
          onChange={handleNumGroupsChange}
          className={styles.input}
          max={variables.length}
        />
      </div>

      <div className={styles.groupsContainer}>
        {Object.keys(groups).map((group, index) => {
          const groupName = `Grupo ${group.replace("group", "")}`;

          return (
            <React.Fragment key={group}>
              <div className={styles.groupWrapper}>
                <div className={styles.groupCard}>
                  <h2>{groupName}</h2>
                  <div className={styles.variables}>
                    {groups[group].map((item) => (
                      <div
                        key={item}
                        className={`${styles.variable} ${
                          selectedVariable === item ? styles.selected : ""
                        }`}
                        onClick={() => handleVariableClick(item)}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {index < Object.keys(groups).length - 1 && (
                <div className={styles.arrowContainer}>
                  <button
                    onClick={() => moveToGroup(`group${index + 2}`)}
                    className={styles.arrowButton}
                  >
                    ➡️
                  </button>
                  <button
                    onClick={() => moveToGroup(`group${index + 1}`)}
                    className={styles.arrowButton}
                  >
                    ⬅️
                  </button>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {warningMessage && (
        <div className={styles.warningMessage}>{warningMessage}</div>  // Exibição da mensagem de aviso
      )}


<div>
  <h3>Matriz de Frequências Esperadas Agrupadas:</h3>
  {newMatrix.length > 0 && (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Respostas</th> {/* Cabeçalho para as linhas */}
          {frequenciasEsperadas.colunas.map((col, colIndex) => (
            <th key={`col-${colIndex}`}>{col}</th> // Colunas baseadas nos valores do JSON
          ))}
        </tr>
      </thead>
      <tbody>
        {newMatrix.map((row, rowIndex) => {
          const groupDescription = `Grupo ${rowIndex + 1}`;

          // Verifica se o grupo existe
          const groupVariables = groups[`group${rowIndex + 1}`];

          // Se o grupo não existir, definimos um valor padrão vazio para as iniciais
          const groupInitials = groupVariables 
            ? groupVariables.map((variable) => getInitials(variable)).join(", ")
            : "Sem Variáveis"; // Caso o grupo não tenha variáveis ou não exista

          return (
            <tr key={rowIndex}>
              <td>{groupDescription} ({groupInitials})</td> {/* Nome do grupo e suas iniciais */}
              {row.map((value, colIndex) => (
                <td key={`grouped-${colIndex}`}>
                  {typeof value === "number" ? value.toFixed(2) : "N/A"}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  )}
</div>


<div>
  <h3>Matriz de Frequências Observadas Agrupadas:</h3>
  {newObservedMatrix.length > 0 && (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Respostas</th> {/* Cabeçalho para as linhas */}
          {frequenciasObservadas.colunas.map((col, colIndex) => (
            <th key={`col-${colIndex}`}>{col}</th> // Colunas baseadas nos valores do JSON
          ))}
        </tr>
      </thead>
      <tbody>
        {newObservedMatrix.map((row, rowIndex) => {
          const groupDescription = `Grupo ${rowIndex + 1}`;

          // Verifica se o grupo existe
          const groupVariables = groups[`group${rowIndex + 1}`];

          // Se o grupo não existir, definimos um valor padrão vazio para as iniciais
          const groupInitials = groupVariables 
            ? groupVariables.map((variable) => getInitials(variable)).join(", ")
            : "Sem Variáveis"; // Caso o grupo não tenha variáveis ou não exista

          return (
            <tr key={rowIndex}>
              <td>{groupDescription} ({groupInitials})</td> {/* Nome do grupo e suas iniciais */}
              {row.map((value, colIndex) => (
                <td key={`observed-grouped-${colIndex}`}>
                  {typeof value === "number" ? value.toFixed(2) : "N/A"}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  )}
</div>





      {chiSquareResults && (
        <div>
          <BoxPlotChart data={data} outliers={outliers} limites={limites} />
          <h3>Resultados do Qui-Quadrado:</h3>
          <p>Qui-Quadrado: {chiSquareResults.chi2.toFixed(2)}</p>
          <p>Graus de Liberdade: {chiSquareResults.dof}</p>
          <p>Alfa: {alfa}</p>
        </div>
      )}

      {pValue !== null && (
        <div>
          <p>p-valor: {pValue.toFixed(8)}</p>
        </div>
      )}
      {/* Condicional para exibir a mensagem baseada no p-valor */}
      {pValue !== null && (
        pValue < alfa ? (
          <p> O p-valor ({pValue.toFixed(8)}) é menor que o alfa ({alfa}), portanto, a nota do Enade é dependente do agrupamento realizado.</p>
        ) : (
          <p> O p-valor ({pValue.toFixed(8)}) é maior que o alfa ({alfa}), portanto, nota do Enade é independente do agrupamento realizado.</p>
        )
      )}

      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

      <div className={styles.validateButtonContainer}>
        <button onClick={handleSubmit} className={styles.validateButton}>
          Validar Agrupamentos
        </button>
      </div>
    </div>
  );
};

export default Agrupamento;
