import { useState } from "react";
import DropdownFilter from "./DropdownFilter";
import ButtonFilter from "./ButtonFilter";
import FieldDescription from "./FieldDescription";
import EditableDecimalField from "./EditableDecimalField";

export default function SidebarChi({ onFilterApply }) {
  const [anoSelecionado, setAnoSelecionado] = useState(null);
  const [regiaoSelecionado, setRegiaoSelecionado] = useState(null);
  const [ufSelecionado, setUFSelecionado] = useState(null);
  const [municipioSelecionado, setMunicipioSelecionado] = useState(null);
  const [catAdmSelecionado, setCatAdmSelecionado] = useState(null);
  const [iesSelecionado, setIesSelecionado] = useState(null);
  const [cursoSelecionado, setCursoSelecionado] = useState(null);
  const [notasSelecionado, setNotasSelecionado] = useState(null);
  const [variavelSelecionado, setVariavelSelecionado] = useState(null);
  const [alfaSelecionado, setAlfaSelecionado] = useState(null);

  // const [selectedItems, setSelectedItems] = useState(Array(6).fill(null));
  const [values, setValues] = useState([
    { value: null, operator: null },
    { value: null, operator: null },
    { value: null, operator: null },
    { value: null, operator: null },
    { value: null, operator: null },
    { value: null, operator: null },
  ]);
  
  const [error, setError] = useState("");

  // Estado para os dropdowns dinâmicos
  const [numeroDropdowns, setNumeroDropdowns] = useState(1); // Número de dropdowns dinâmicos
  const [selectedItems, setSelectedItems] = useState([]); // Itens selecionados nos dropdowns dinâmicos

  // Função para tratar a seleção do ano
  const handleAnoSelecionado = (ano) => {
    setAnoSelecionado(ano);
    resetFiltros();  // Limpa todos os filtros subsequentes
  };

  const handleRegiaoSelecionado = (regiao) => {
    setRegiaoSelecionado(regiao);
    setUFSelecionado(null);  // Limpa a UF
    setMunicipioSelecionado(null);  // Limpa o município
    setCatAdmSelecionado(null);  // Limpa a categoria administrativa
    setIesSelecionado(null);  // Limpa IES
    setCursoSelecionado(null);  // Limpa o curso
    setNotasSelecionado(null);
    setVariavelSelecionado(null);  // Limpa a variável
    setAlfaSelecionado(null);  // Limpa o alfa
  };

  const handleUFSelecionado = (uf) => {
    setUFSelecionado(uf);
    setMunicipioSelecionado(null);  // Limpa os filtros subsequentes
    setCatAdmSelecionado(null);
    setIesSelecionado(null);
    setCursoSelecionado(null);
    setNotasSelecionado(null);
    setVariavelSelecionado(null);
    setAlfaSelecionado(null);
  };

  const handleMunicipioSelecionado = (municipio) => {
    setMunicipioSelecionado(municipio);
    setCatAdmSelecionado(null);  // Limpa os filtros subsequentes
    setIesSelecionado(null);
    setCursoSelecionado(null);
    setNotasSelecionado(null);
    setVariavelSelecionado(null);
    setAlfaSelecionado(null);
  };

  const handleCatAdmSelecionado = (catAdm) => {
    setCatAdmSelecionado(catAdm);
    setIesSelecionado(null);  // Limpa os filtros subsequentes
    setCursoSelecionado(null);
    setNotasSelecionado(null);
    setVariavelSelecionado(null);
    setAlfaSelecionado(null);
  };

  const handleIesSelecionado = (ies) => {
    setIesSelecionado(ies);
    setCursoSelecionado(null);  // Limpa os filtros subsequentes
    setNotasSelecionado(null);
    setVariavelSelecionado(null);
    setAlfaSelecionado(null);
  };

  const handleCursoSelecionado = (curso) => {
    setCursoSelecionado(curso);
    setNotasSelecionado(null);
    setVariavelSelecionado(null);  // Limpa os filtros subsequentes
    setAlfaSelecionado(null);
  };

  const handleVariavelSelecionado = (variavel) => {
    setVariavelSelecionado(variavel);
    setNotasSelecionado(null);
    resetAlfa();  // Limpa o alfa
  };

  const handleNotasSelecionado = (notas) => {
    setNotasSelecionado(notas);
    resetAlfa();

    setSelectedItems(Array(notas).fill(null));
  };
  
  const resetAlfa = () => {
    setAlfaSelecionado("0.00");  // Resetando para o valor inicial
  };

  const handleFiltrar = () => {
    if (isFormValid()) {
      const appliedFilters = {
        ano: anoSelecionado,
        regiao: regiaoSelecionado,
        uf: ufSelecionado,
        municipio: municipioSelecionado,
        catAdm: catAdmSelecionado,
        ies: iesSelecionado,
        curso: cursoSelecionado,
        variavel: variavelSelecionado,
        alfa: alfaSelecionado,
      };
      onFilterApply(appliedFilters);
    }
  };

  const isFormValid = () => {
    return (
      anoSelecionado &&
      regiaoSelecionado &&
      ufSelecionado &&
      municipioSelecionado &&
      catAdmSelecionado &&
      iesSelecionado &&
      cursoSelecionado &&
      variavelSelecionado &&
      notasSelecionado &&
      alfaSelecionado
    );
  };

  // Função que limpa todos os filtros após a seleção do ano
  const resetFiltros = () => {
    setRegiaoSelecionado(null);
    setUFSelecionado(null);
    setMunicipioSelecionado(null);
    setCatAdmSelecionado(null);
    setIesSelecionado(null);
    setCursoSelecionado(null);
    setVariavelSelecionado(null);
    setNotasSelecionado(null);
    setAlfaSelecionado(null);
  };
  
// NOVAS VALIDAÇÕES

const handleDropdownChange = (index, selectedValue) => {
  const updatedItems = [...selectedItems];
  updatedItems[index] = selectedValue;
  setSelectedItems(updatedItems);

  // Validar o valor atual após mudar o operador
  if (values[index].value != null) {
    const isValid = validateValue(index, values[index].value, selectedValue);
    if (!isValid) {
      setError("Operador e valor incompatíveis.");
    }
  }
};


 // Função para validar os valores de acordo com o operador
 const validateValue = (index, newValue, operator) => {
  const maxValue = 100.0;
  if (newValue > maxValue) {
    setError("O valor não pode ser maior que 100.");
    return false;
  }
  setError("");

  // Se não for o primeiro item, validar com base no valor e operador da linha anterior
  if (index > 0) {
    const prevValue = values[index - 1].value;
    const prevOperator = selectedItems[index - 1];

    if (prevValue != null && prevOperator != null) {
      switch (prevOperator) {
        case "<":
          if (newValue >= prevValue) {
            setError("O valor não pode ser maior ou igual ao valor anterior.");
            return false;
          }
          break;
        case "<=":
          if (newValue > prevValue) {
            setError("O valor não pode ser maior que o valor anterior.");
            return false;
          }
          break;
        case ">":
          if (newValue <= prevValue) {
            setError("O valor não pode ser menor ou igual ao valor anterior.");
            return false;
          }
          break;
        case ">=":
          if (newValue < prevValue) {
            setError("O valor não pode ser menor que o valor anterior.");
            return false;
          }
          break;
        default:
          break;
      }
    }
  }

  return true;
};

// Função para manipular a mudança de valor no campo decimal
const handleValueChange = (index, newValue) => {
  const isValid = validateValue(index, newValue, selectedItems[index]);
  if (isValid) {
    // Cria uma cópia profunda do array `values`
    const updatedValues = values.map((item, i) =>
      i === index ? { ...item, value: newValue } : { ...item }
    );
    setValues(updatedValues);
    setError("");
  } else {
    setError("O valor deve ser maior que 40 e menor que 50");
  }
};

  
  return (
    <div className="sidebar">
      <h4>Filtros</h4>
      <div className="text">
        <FieldDescription description="Ano" />
      </div>
      <DropdownFilter
        placeholder="Selecione o ano"
        onSelect={handleAnoSelecionado}
        coluna="ano"
        selectedItem={anoSelecionado}  // Passando selectedItem para garantir que o valor esteja sincronizado
      />
      {anoSelecionado && (
        <>
          <div className="text">
            <FieldDescription description="Região" />
          </div>
          <DropdownFilter
            onSelect={handleRegiaoSelecionado}
            placeholder="Selecione a região"
            queryParams={`coluna=dsc_regiao&ano=${anoSelecionado}`}
            selectedItem={regiaoSelecionado}  // Passando selectedItem para a região
          />
        </>
      )}
      {regiaoSelecionado && (
        <>
          <div className="text">
            <FieldDescription description="UF" />
          </div>
          <DropdownFilter
            selectedItem={ufSelecionado}  // Passando selectedItem para a UF
            onSelect={handleUFSelecionado}
            placeholder="Selecione a UF"
            queryParams={`coluna=dsc_uf&ano=${anoSelecionado}&regiao=${regiaoSelecionado}`}
          />
        </>
      )}
      {ufSelecionado && (
        <>
          <div className="text">
            <FieldDescription description="Municipio" />
          </div>
          <DropdownFilter
            selectedItem={municipioSelecionado}  // Passando selectedItem para o município
            onSelect={handleMunicipioSelecionado}
            placeholder="Selecione o município"
            queryParams={`coluna=dsc_municipio&ano=${anoSelecionado}&regiao=${regiaoSelecionado}&uf=${ufSelecionado}`}
          />
        </>
      )}
      {municipioSelecionado && (
        <>
          <div className="text">
            <FieldDescription description="Categoria Administrativa" />
          </div>
          <DropdownFilter
            selectedItem={catAdmSelecionado}  // Passando selectedItem para a categoria administrativa
            onSelect={handleCatAdmSelecionado}
            placeholder="Selecione a categoria adm"
            queryParams={`coluna=dsc_cat_adm&ano=${anoSelecionado}&regiao=${regiaoSelecionado}&uf=${ufSelecionado}&municipio=${municipioSelecionado}`}
          />
        </>
      )}
      {catAdmSelecionado && (
        <>
          <div className="text">
            <FieldDescription description="IES" />
          </div>
          <DropdownFilter
            selectedItem={iesSelecionado}  // Passando selectedItem para a IES
            onSelect={handleIesSelecionado}
            placeholder="Selecione a IES"
            queryParams={`coluna=cod_ies&ano=${anoSelecionado}&regiao=${regiaoSelecionado}&uf=${ufSelecionado}&municipio=${municipioSelecionado}&cat_adm=${catAdmSelecionado}`}
          />
        </>
      )}
      {iesSelecionado && (
        <>
          <div className="text">
            <FieldDescription description="Curso" />
          </div>
          <DropdownFilter
            selectedItem={cursoSelecionado}  // Passando selectedItem para o curso
            onSelect={handleCursoSelecionado}
            placeholder="Selecione o curso"
            queryParams={`coluna=dsc_grupo&ano=${anoSelecionado}&regiao=${regiaoSelecionado}&uf=${ufSelecionado}&municipio=${municipioSelecionado}&cat_adm=${catAdmSelecionado}&cod_ies=${iesSelecionado}`}
          />
        </>
      )}
      {cursoSelecionado && (
        <>
          <div className="text">
            <FieldDescription description="Variável" />
          </div>
          <DropdownFilter
            selectedItem={variavelSelecionado}  // Passando selectedItem para a variável
            onSelect={handleVariavelSelecionado}
            placeholder="Selecione a variável"
            coluna="variavel"
            queryParams={`${anoSelecionado}`}
          />
        </>
      )}

      {variavelSelecionado && (
        <>
          <div className="text">
            <FieldDescription description="Range de Intervalo de Notas" />
          </div>
          <DropdownFilter
            selectedItem={notasSelecionado}  // Passando selectedItem para a variável
            onSelect={handleNotasSelecionado}
            placeholder="Selecione o range"
            coluna="notas"
          />
        </>
      )}

      
      {/* Dropdowns Dinâmicos com base na seleção de 'notasSelecionado' */}
      {notasSelecionado === '2' && (
        <>
          <div className="text">
            <FieldDescription description="Selecione as opções adicionais" />
          </div>
          <div className="dropdownGroup">
            {/* Primeira linha com um único Dropdown */}
            <div className="dropdownRow">
              <DropdownFilter
                key={0}
                coluna="operador"
                placeholder="Operador"
                onSelect={(value) => handleDropdownChange(0, value)}
                selectedItem={selectedItems[0]}
                initialSelectedIndex={0}
              />
              <EditableDecimalField 
                value={values[0]?.value} 
                onChange={(value) => handleValueChange(0, value)} 
              />

              {error && <div className="error-message">{error}</div>} {/* Aqui */}
            </div>
            <div className="dropdownRow">
              <DropdownFilter
                key={0}
                coluna="operador"
                placeholder="Operador"
                onSelect={(value) => handleDropdownChange(0, value)}
                selectedItem={selectedItems[0]}
                initialSelectedIndex={1}
              />
              <EditableDecimalField 
                value={values[0]?.value} 
                onChange={(value) => handleValueChange(0, value)} 
              />
              {error && <div className="error-message">{error}</div>} {/* Aqui */}

            </div>
          </div>
        </>
      )}

      {notasSelecionado === '3' && (
        <>
          <div className="text">
            <FieldDescription description="Selecione as opções adicionais" />
          </div>
          <div className="dropdownGroup">
            {/* Primeira linha com um único Dropdown */}
            <div className="dropdownRow">
              <DropdownFilter
                key={0}
                coluna="operador"
                placeholder="Operador"
                onSelect={(value) => handleDropdownChange(0, value)}
                selectedItem={selectedItems[0]}
                initialSelectedIndex={0}
              />
              <EditableDecimalField />
            </div>
            {/* Segunda linha com dois dropdowns lado a lado */}
            <div className="dropdownRow">
              <DropdownFilter
                key={1}
                coluna="operador"
                placeholder="Operador"
                onSelect={(value) => handleDropdownChange(1, value)}
                selectedItem={selectedItems[1]}
                initialSelectedIndex={3}
              />
              <EditableDecimalField />
              <h5>E</h5>
              <DropdownFilter
                key={2}
                coluna="operador"
                placeholder="Operador"
                onSelect={(value) => handleDropdownChange(2, value)}
                selectedItem={selectedItems[2]}
                initialSelectedIndex={0}
              />
              <EditableDecimalField />

            </div>
            {/* Última linha com um único Dropdown */}
            <div className="dropdownRow">
              <DropdownFilter
                key={3}
                coluna="operador"
                placeholder="Operador"
                onSelect={(value) => handleDropdownChange(3, value)}
                selectedItem={selectedItems[3]}
                initialSelectedIndex={1}
              />
              <EditableDecimalField />

            </div>
          </div>
        </>
      )}

      {notasSelecionado === '4' && (
        <>
          <div className="text">
            <FieldDescription description="Selecione as opções adicionais" />
          </div>
          <div className="dropdownGroup">
            {/* Primeira linha com um único Dropdown */}
            <div className="dropdownRow">
              <DropdownFilter
                key={0}
                coluna="operador"
                placeholder="Operador"
                onSelect={(value) => handleDropdownChange(0, value)}
                selectedItem={selectedItems[0]}
                initialSelectedIndex={0}
              />
              <EditableDecimalField />
            </div>
            {/* Segunda linha com dois dropdowns lado a lado */}
            <div className="dropdownRow">
              <DropdownFilter
                key={1}
                coluna="operador"
                placeholder="Operador"
                onSelect={(value) => handleDropdownChange(1, value)}
                selectedItem={selectedItems[1]}
                initialSelectedIndex={3}
              />
              <EditableDecimalField />
              <h5>E</h5>
              <DropdownFilter
                key={2}
                coluna="operador"
                placeholder="Operador"
                onSelect={(value) => handleDropdownChange(2, value)}
                selectedItem={selectedItems[2]}
                initialSelectedIndex={0}
              />
              <EditableDecimalField />

            </div>
            {/* Terceira linha com dois dropdowns lado a lado */}
            <div className="dropdownRow">
              <DropdownFilter
                key={3}
                coluna="operador"
                placeholder="Operador"
                onSelect={(value) => handleDropdownChange(3, value)}
                selectedItem={selectedItems[3]}
                initialSelectedIndex={3}
              />
              <EditableDecimalField />
              <h5>E</h5>
              <DropdownFilter
                key={4}
                coluna="operador"
                placeholder="Operador"
                onSelect={(value) => handleDropdownChange(4, value)}
                selectedItem={selectedItems[4]}
                initialSelectedIndex={0}
              />
              <EditableDecimalField />

            </div>
            {/* Última linha com um único Dropdown */}
            <div className="dropdownRow">
              <DropdownFilter
                key={3}
                coluna="operador"
                placeholder="Operador"
                onSelect={(value) => handleDropdownChange(3, value)}
                selectedItem={selectedItems[3]}
                initialSelectedIndex={1}
              />
              <EditableDecimalField />

            </div>
          </div>
        </>
      )}

      {notasSelecionado === '5' && (
        <>
          <div className="text">
            <FieldDescription description="Selecione as opções adicionais" />
          </div>
          <div className="dropdownGroup">
            {/* Primeira linha com um único Dropdown */}
            <div className="dropdownRow">
              <DropdownFilter
                key={0}
                coluna="operador"
                placeholder="Operador"
                onSelect={(value) => handleDropdownChange(0, value)}
                selectedItem={selectedItems[0]}
                initialSelectedIndex={0}
              />
              <EditableDecimalField />

            </div>
            {/* Segunda linha com dois dropdowns lado a lado */}
            <div className="dropdownRow">
              <DropdownFilter
                key={1}
                coluna="operador"
                placeholder="Operador"
                onSelect={(value) => handleDropdownChange(1, value)}
                selectedItem={selectedItems[1]}
                initialSelectedIndex={3}
              />
              <EditableDecimalField />
              <h5>E</h5>
              <DropdownFilter
                key={2}
                coluna="operador"
                placeholder="Operador"
                onSelect={(value) => handleDropdownChange(2, value)}
                selectedItem={selectedItems[2]}
                initialSelectedIndex={0}
              />
              <EditableDecimalField />

            </div>
            {/* Terceira linha com dois dropdowns lado a lado */}
            <div className="dropdownRow">
              <DropdownFilter
                key={3}
                coluna="operador"
                placeholder="Operador"
                onSelect={(value) => handleDropdownChange(3, value)}
                selectedItem={selectedItems[3]}
                initialSelectedIndex={3}
              />
              <EditableDecimalField />
              <h5>E</h5>
              <DropdownFilter
                key={4}
                coluna="operador"
                placeholder="Operador"
                onSelect={(value) => handleDropdownChange(4, value)}
                selectedItem={selectedItems[4]}
                initialSelectedIndex={0}
              />
              <EditableDecimalField />

            </div>
            {/* Quarta linha com dois dropdowns lado a lado */}
            <div className="dropdownRow">
              <DropdownFilter
                key={3}
                coluna="operador"
                placeholder="Operador"
                onSelect={(value) => handleDropdownChange(3, value)}
                selectedItem={selectedItems[3]}
                initialSelectedIndex={3}
              />
              <EditableDecimalField />
              <h5>E</h5>
              <DropdownFilter
                key={4}
                coluna="operador"
                placeholder="Operador"
                onSelect={(value) => handleDropdownChange(4, value)}
                selectedItem={selectedItems[4]}
                initialSelectedIndex={0}
              />
              <EditableDecimalField />

            </div>
            {/* Última linha com um único Dropdown */}
            <div className="dropdownRow">
              <DropdownFilter
                key={5}
                coluna="operador"
                placeholder="Operador"
                onSelect={(value) => handleDropdownChange(5, value)}
                selectedItem={selectedItems[5]}
                initialSelectedIndex={1}
              />
              <EditableDecimalField />

            </div>
          </div>
        </>
      )}



      {notasSelecionado && (
        <>
          <div className="text">
            <FieldDescription description="Alfa" ativo={true} info={"Alfa (α) é o valor de corte para o teste de Qui-Quadrado. Ele define a probabilidade de cometer um erro ao rejeitar a hipótese nula quando ela é verdadeira. Geralmente, α é 0.05."} />
          </div>
          <EditableDecimalField
            onChange={setAlfaSelecionado}  // Atualiza o alfaSelecionado
            value={alfaSelecionado} // Passa o valor atual para o EditableDecimalField
          />
        </>
      )}

      <ButtonFilter
        isFormValid={isFormValid()}
        onClick={handleFiltrar}
      />
    </div>
  );
}
