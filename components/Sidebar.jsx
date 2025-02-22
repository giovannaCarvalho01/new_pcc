// components/Sidebar.js
import { useState } from "react";
import DropdownFilter from "./DropdownFilter"; // Suponho que você tenha esse componente
import ButtonFilter from "./ButtonFilter"; // Importando o novo componente
import FieldDescription from "./FieldDescription"; 

export default function Sidebar({ onFilterApply }) {
  const [anoSelecionado, setAnoSelecionado] = useState(null);
  const [regiaoSelecionado, setRegiaoSelecionado] = useState(null);
  const [ufSelecionado, setUFSelecionado] = useState(null);
  const [municipioSelecionado, setMunicipioSelecionado] = useState(null);
  const [catAdmSelecionado, setCatAdmSelecionado] = useState(null);
  const [iesSelecionado, setIesSelecionado] = useState(null);
  const [cursoSelecionado, setCursoSelecionado] = useState(null);
  // Estado para controle do pop-up
  const [showPopup, setShowPopup] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleToggleDropdown = (dropdownId) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  // Função para tratar a seleção do ano e resetar filtros subsequentes
  const handleAnoSelecionado = (ano) => {
    setAnoSelecionado(ano);
    resetFiltros();  // Limpa todos os filtros subsequentes
    // Exibe o pop-up se o ano for 2022 ou 2021
    if (ano === "2022" || ano === "2021") {
      setShowPopup(true);
    } else {
      setShowPopup(false); // Esconde o pop-up se o ano for diferente
    }
  };

  const handleRegiaoSelecionado = (regiao) => {
    setRegiaoSelecionado(regiao);
    setUFSelecionado(null);  // Limpa a UF
    setMunicipioSelecionado(null);  // Limpa o município
    setCatAdmSelecionado(null);  // Limpa a categoria administrativa
    setIesSelecionado(null);  // Limpa IES
    setCursoSelecionado(null);  // Limpa o curso
  };

  const handleUFSelecionado = (uf) => {
    setUFSelecionado(uf);
    setMunicipioSelecionado(null);  // Limpa os filtros subsequentes
    setCatAdmSelecionado(null);
    setIesSelecionado(null);
    setCursoSelecionado(null);
  };

  const handleMunicipioSelecionado = (municipio) => {
    setMunicipioSelecionado(municipio);
    setCatAdmSelecionado(null);  // Limpa os filtros subsequentes
    setIesSelecionado(null);
    setCursoSelecionado(null);
  };

  const handleCatAdmSelecionado = (catAdm) => {
    setCatAdmSelecionado(catAdm);
    setIesSelecionado(null);  // Limpa os filtros subsequentes
    setCursoSelecionado(null);
  };

  const handleIesSelecionado = (ies) => {
    setIesSelecionado(ies);
    setCursoSelecionado(null);  // Limpa os filtros subsequentes
  };

  const handleCursoSelecionado = (curso) => {
    setCursoSelecionado(curso);
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
      };
      onFilterApply(appliedFilters); // Chama a função passada pelo componente pai
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
      cursoSelecionado
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
        isOpened={openDropdown === "ano"}
        onToggle={() => handleToggleDropdown("ano")}
      />
      {/* Exibe o pop-up se o estado showPopup for true */}
      {showPopup && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2>Aviso</h2>
            <p> Você selecionou um ano que já conta com as mudanças nos arquivos do Enade para atender a LGPD. Conforme descrito pelo Inep:</p>
            <p>"Ressalta-se que a nova estrutura dos Microdados do Enade permite ao pesquisador realizar estudos em relação ao perfil dos cursos e seus resultados, sendo possível agrupar os diferentes arquivos pelo código de curso (CO_CURSO).</p>
            <p><strong>No entanto, não é possível agrupar as informações no nível de estudante, considerando que cada arquivo está ordenado por variáveis distintas.</strong> Por exemplo, mesmo reordenando por código de curso todos os arquivos, os dados da primeira linha de um dos arquivos não se referem ao mesmo indivíduo dos dados da primeira linha de outro arquivo."</p>
            <button onClick={() => setShowPopup(false)}>Fechar</button>
          </div>
        </div>
      )}
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
            isOpened={openDropdown === "regiao"}
            onToggle={() => handleToggleDropdown("regiao")}
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
            isOpened={openDropdown === "uf"}
            onToggle={() => handleToggleDropdown("uf")}
          />
        </>
      )}
      {ufSelecionado && (
        <>
          <div className="text">
            <FieldDescription description="Município" />
          </div>
          <DropdownFilter
            selectedItem={municipioSelecionado}  // Passando selectedItem para o município
            onSelect={handleMunicipioSelecionado}
            placeholder="Selecione o município"
            queryParams={`coluna=dsc_municipio&ano=${anoSelecionado}&regiao=${regiaoSelecionado}&uf=${ufSelecionado}`}
            isOpened={openDropdown === "municipio"}
            onToggle={() => handleToggleDropdown("municipio")}
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
            isOpened={openDropdown === "cat_adm"}
            onToggle={() => handleToggleDropdown("cat_adm")}
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
            isOpened={openDropdown === "ies"}
            onToggle={() => handleToggleDropdown("ies")}
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
            isOpened={openDropdown === "curso"}
            onToggle={() => handleToggleDropdown("curso")}
          />
        </>
      )}

      {/* Usando o ButtonFilter */}
      <ButtonFilter
        isFormValid={isFormValid()}
        onClick={handleFiltrar}
      />
    </div>
  );
}
