import React, { useState, useEffect } from 'react';
import styles from '../styles/Agrupamento.module.css';

const Agrupamento = ({ frequenciasEsperadas }) => {
  const [numGroups, setNumGroups] = useState(1);
  const [variables, setVariables] = useState([]); // Variáveis das colunas das frequências esperadas
  const [groups, setGroups] = useState({ group1: [] }); // Inicializa o grupo 1 vazio
  const [selectedVariable, setSelectedVariable] = useState(null); // Variável selecionada
  const [newMatrix, setNewMatrix] = useState([]); // Nova matriz de frequências esperadas
  const [errorMessage, setErrorMessage] = useState(null); // Mensagem de erro

  // Inicializa as variáveis a partir das colunas das frequências esperadas
  useEffect(() => {
    calculateGroupedMatrix();
  }, [numGroups, groups]);

  // Função para manipular a mudança na quantidade de agrupamentos
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
  
      // Adiciona novos grupos se necessário
      for (let i = Object.keys(updatedGroups).length + 1; i <= newNumGroups; i++) {
        updatedGroups[`group${i}`] = [];
      }
  
      // Remove grupos excedentes
      if (newNumGroups < Object.keys(updatedGroups).length) {
        const groupsToRemove = Object.keys(updatedGroups).slice(newNumGroups);
        groupsToRemove.forEach((group) => {
          // Move todas as variáveis dos grupos removidos para group1
          updatedGroups.group1 = [...updatedGroups.group1, ...updatedGroups[group]];
          delete updatedGroups[group];
        });
      }
  
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

        // Remove a variável de outros grupos
        Object.keys(updatedGroups).forEach((group) => {
          updatedGroups[group] = updatedGroups[group].filter((item) => item !== selectedVariable);
        });

        // Adiciona a variável no grupo selecionado
        updatedGroups[targetGroup].push(selectedVariable);
        setSelectedVariable(null); // Limpa a variável selecionada após a mudança

        // Valida a distribuição das variáveis
        const isValid = validateGroups(updatedGroups);
        setErrorMessage(isValid ? null : 'Todas as variáveis devem ser distribuídas em mais de um grupo!');

        return updatedGroups;
      });
    }
  };

  const validateGroups = (updatedGroups) => {
    const groupEntries = Object.entries(updatedGroups);

    // Verifica se todos os grupos estão preenchidos
    for (const [group, variablesInGroup] of groupEntries) {
      if (variablesInGroup.length === 0) {
        return false;
      }
    }

    // Verifica se nenhuma variável está em apenas um grupo
    const variableCounts = variables.reduce((acc, variable) => {
      let count = 0;
      groupEntries.forEach(([group, variablesInGroup]) => {
        if (variablesInGroup.includes(variable)) {
          count += 1;
        }
      });
      if (count === 1) {
        return false;
      }
      return acc;
    }, {});

    return true; // Se todos os grupos estão preenchidos e as variáveis distribuídas corretamente
  };

  // Função para calcular a nova matriz de frequências esperadas após o agrupamento
  const calculateGroupedMatrix = () => {
    if (!frequenciasEsperadas || !frequenciasEsperadas.matriz) return;
  
    const groupedMatrix = frequenciasEsperadas.matriz.map((row) => {
      return Object.keys(groups).map((groupKey) => {
        const groupVariables = groups[groupKey];
        const relevantColumnsIndexes = groupVariables.map((variable) =>
          frequenciasEsperadas.colunas.indexOf(variable)
        );
  
        // Soma as frequências esperadas das variáveis selecionadas para o grupo
        return relevantColumnsIndexes.reduce((sum, colIndex) => sum + row[colIndex], 0);
      });
    });
  
    setNewMatrix(groupedMatrix);
  };
  // Função para aplicar a regra de Siegel na nova matriz
  const validateSiegelConditions = () => {
    let belowFiveCount = 0;
    let belowOneCount = 0;
    const totalCells = newMatrix.length * newMatrix[0].length;

    // Percorre cada célula da nova matriz
    newMatrix.forEach((row) => {
      row.forEach((cell) => {
        if (cell < 1) {
          belowOneCount++;
        }
        if (cell < 5) {
          belowFiveCount++;
        }
      });
    });

    // Verifica as condições de Siegel
    const isValid = belowOneCount === 0 && belowFiveCount / totalCells <= 0.2;

    return {
      isValid,
      belowFiveCount,
      belowOneCount,
    };
  };

  const handleSubmit = () => {
    const isValid = validateGroups(groups);
    setErrorMessage(isValid ? null : 'Todas as variáveis devem ser distribuídas em mais de um grupo!');
    
    if (isValid) {
      calculateGroupedMatrix(); // Calcula a nova matriz de frequências agrupadas ao validar
      const siegelValidation = validateSiegelConditions();
      if (siegelValidation.isValid) {
        alert('Agrupamentos validados com sucesso! A regra de Siegel foi atendida.');
      } else {
        setErrorMessage(
          `A regra de Siegel não foi atendida. Células com valor abaixo de 5: ${siegelValidation.belowFiveCount}, Células com valor abaixo de 1: ${siegelValidation.belowOneCount}`
        );
      }
    }
  };

  useEffect(() => {
    // Recalcular a matriz agrupada sempre que os grupos mudarem
    if (Object.keys(groups).length > 1) {
      calculateGroupedMatrix();
    }
  }, [groups]);

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
          max={variables.length} // Impede inserir valores maiores que o número de variáveis
        />
      </div>

      <div className={styles.groupsContainer}>
        {Object.keys(groups).map((group, index) => {
          const groupName = `Grupo ${group.replace('group', '')}`;

          return (
            <React.Fragment key={group}>
              <div className={styles.groupWrapper}>
                <div className={styles.groupCard}>
                  <h2>{groupName}</h2>
                  <div className={styles.variables}>
                    {groups[group].map((item) => (
                      <div
                        key={item}
                        className={`${styles.variable} ${selectedVariable === item ? styles.selected : ''}`}
                        onClick={() => handleVariableClick(item)}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Exibe as setas entre os grupos, exceto após o último grupo */}
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

      {/* Exibe a nova matriz com as frequências agrupadas */}
      <div>
        <h3>Matriz de Frequências Agrupadas:</h3>
        {newMatrix.length > 0 && (
          <table className={styles.table}>
          <thead>
            <tr>
              {Object.keys(groups).map((groupKey) => (
                <th key={groupKey}>{`Grupo ${groupKey.replace('group', '')}`}</th>
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

      {/* Exibe mensagem de erro */}
      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

      {/* Botão para validar os agrupamentos */}
      <div className={styles.validateButtonContainer}>
        <button onClick={handleSubmit} className={styles.validateButton}>
          Validar Agrupamentos
        </button>
      </div>
    </div>
  );
};

export default Agrupamento;
