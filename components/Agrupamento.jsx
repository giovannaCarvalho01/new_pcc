import React, { useState, useEffect } from "react";
import styles from "../styles/Agrupamento.module.css";
import jstat from "jstat"; // Importando a biblioteca jstat

const Agrupamento = ({ frequenciasEsperadas, frequenciasObservadas }) => {
  const [numGroups, setNumGroups] = useState(1);
  const [variables, setVariables] = useState([]);
  const [groups, setGroups] = useState({ group1: [] });
  const [selectedVariable, setSelectedVariable] = useState(null);
  const [newMatrix, setNewMatrix] = useState([]);
  const [newObservedMatrix, setNewObservedMatrix] = useState([]);
  const [chiSquareResults, setChiSquareResults] = useState(null);
  const [pValue, setPValue] = useState(null); // Novo estado para o p-valor
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (frequenciasEsperadas && frequenciasEsperadas.colunas) {
      setVariables(frequenciasEsperadas.colunas);
      setGroups({ group1: [...frequenciasEsperadas.colunas] });
    }
  }, [frequenciasEsperadas]);

  useEffect(() => {
    if (Object.keys(groups).length > 1) {
      calculateGroupedMatrix();
    }
  }, [groups]);

  const handleNumGroupsChange = (e) => {
    const newNumGroups = parseInt(e.target.value, 10);
    const maxGroups = variables.length;
  
    if (newNumGroups > maxGroups) {
      setNumGroups(maxGroups);
      alert(`O número máximo de agrupamentos é ${maxGroups} devido ao número de variáveis.`);
    } else {
      setNumGroups(newNumGroups);
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

  const calculateGroupedMatrix = () => {
    if (!frequenciasEsperadas || !frequenciasEsperadas.matriz) return;

    const groupedMatrix = frequenciasEsperadas.matriz.map((row) =>
      Object.keys(groups).map((groupKey) => {
        const groupVariables = groups[groupKey];
        const relevantColumnsIndexes = groupVariables.map((variable) =>
          frequenciasEsperadas.colunas.indexOf(variable)
        );

        return relevantColumnsIndexes.reduce((sum, colIndex) => sum + row[colIndex], 0);
      })
    );

    setNewMatrix(groupedMatrix);

    if (frequenciasObservadas) {
      const groupedObservedMatrix = frequenciasObservadas.matriz.map((row) =>
        Object.keys(groups).map((groupKey) => {
          const groupVariables = groups[groupKey];
          const relevantColumnsIndexes = groupVariables.map((variable) =>
            frequenciasObservadas.colunas.indexOf(variable)
          );

          return relevantColumnsIndexes.reduce((sum, colIndex) => sum + row[colIndex], 0);
        })
      );

      setNewObservedMatrix(groupedObservedMatrix);
    }
  };

  const calculateChiSquare = () => {
    if (!newMatrix.length || !newObservedMatrix.length) return;

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
    const p = 1 - jstat.chisquare.cdf(chi2, dof); // Usando a CDF para o p-valor

    setChiSquareResults({ chi2, dof });
    setPValue(p); // Definindo o p-valor
  };

  const handleSubmit = () => {
    const isValid = validateGroups(groups);
    setErrorMessage(isValid ? null : "Todas as variáveis devem ser distribuídas em mais de um grupo!");

    if (isValid) {
      calculateGroupedMatrix();
      calculateChiSquare();
      alert("Agrupamentos validados e qui-quadrado calculado!");
    }
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

      <div>
        <h3>Matriz de Frequências Agrupadas:</h3>
        {newMatrix.length > 0 && (
          <table className={styles.table}>
            <thead>
              <tr>
                {Object.keys(groups).map((groupKey) => (
                  <th key={groupKey}>{`Grupo ${groupKey.replace("group", "")}`}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {newMatrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((value, colIndex) => (
                    <td key={colIndex}>{value.toFixed(2)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {chiSquareResults && (
        <div>
          <h3>Resultados do Qui-Quadrado:</h3>
          <p>Qui-Quadrado: {chiSquareResults.chi2.toFixed(2)}</p>
          <p>Graus de Liberdade: {chiSquareResults.dof}</p>
        </div>
      )}

      {pValue !== null && (
        <div>
          <p>p-valor: {pValue.toFixed(4)}</p>
        </div>
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
