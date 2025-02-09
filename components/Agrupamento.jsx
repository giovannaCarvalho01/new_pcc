import React, { useState } from 'react';
import styles from '../styles/Agrupamento.module.css';

const Agrupamento = () => {
  const [numGroups, setNumGroups] = useState(1);
  const [variables, setVariables] = useState(['Var1', 'Var2', 'Var3', 'Var4']); // Variáveis já no grupo 1
  const [groups, setGroups] = useState({ group1: ['Var1', 'Var2', 'Var3', 'Var4'] }); // Variáveis já no grupo 1
  const [selectedVariable, setSelectedVariable] = useState(null); // Variável selecionada
  const [errorMessage, setErrorMessage] = useState(null); // Mensagem de erro

  // Função para manipular a mudança na quantidade de agrupamentos
  const handleNumGroupsChange = (e) => {
    const newNumGroups = parseInt(e.target.value, 10);
    const maxGroups = variables.length;

    // Se o número de agrupamentos for maior que o número de variáveis, ajusta para o número máximo possível
    if (newNumGroups > maxGroups) {
      setNumGroups(maxGroups);
      alert(`O número máximo de agrupamentos é ${maxGroups} devido ao número de variáveis.`);
    } else {
      setNumGroups(newNumGroups);
    }

    setGroups((prevGroups) => {
      const updatedGroups = { ...prevGroups };

      // Adiciona novos grupos, se necessário
      for (let i = Object.keys(updatedGroups).length + 1; i <= newNumGroups; i++) {
        updatedGroups[`group${i}`] = [];
      }

      // Remove grupos excedentes, se necessário
      if (newNumGroups < Object.keys(updatedGroups).length) {
        const groupsToRemove = Object.keys(updatedGroups).slice(newNumGroups);
        groupsToRemove.forEach((group) => {
          updatedGroups.group1 = [...updatedGroups.group1, ...updatedGroups[group]];
          delete updatedGroups[group];
        });
      }

      return updatedGroups;
    });
  };

  const handleVariableClick = (variable) => {
    setSelectedVariable(variable); // Define a variável selecionada
  };

  const moveToGroup = (targetGroup) => {
    if (selectedVariable) {
      setGroups((prevGroups) => {
        const updatedGroups = { ...prevGroups };

        // Remove a variável de outros grupos
        Object.keys(updatedGroups).forEach((group) => {
          updatedGroups[group] = updatedGroups[group].filter((item) => item !== selectedVariable);
        });

        // Adiciona ao grupo alvo
        updatedGroups[targetGroup].push(selectedVariable);
        setSelectedVariable(null); // Limpa a seleção da variável após a mudança

        // Valida novamente após a movimentação
        const isValid = validateGroups(updatedGroups);
        setErrorMessage(isValid ? null : 'Todas as variáveis devem ser distribuídas em mais de um grupo!');

        return updatedGroups;
      });
    }
  };

  // Função para validar os agrupamentos
  const validateGroups = (updatedGroups) => {
    // Verifica se todos os grupos estão preenchidos
    const groupEntries = Object.entries(updatedGroups);
    for (const [group, variablesInGroup] of groupEntries) {
      if (variablesInGroup.length === 0) {
        return false; // Grupo vazio
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
        return false; // Variável em apenas um grupo
      }
      return acc;
    }, {});

    return true; // Se todos os grupos estão preenchidos e as variáveis estão distribuídas em mais de um grupo
  };

  const handleSubmit = () => {
    const isValid = validateGroups(groups);
    setErrorMessage(isValid ? null : 'Todas as variáveis devem ser distribuídas em mais de um grupo!');
    if (isValid) {
      alert('Agrupamentos validados com sucesso!');
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
          max={variables.length} // Impede a inserção de valores maiores que o número de variáveis
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
