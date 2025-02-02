// components/Sidebar.js
import { useState } from "react";
import DropdownFilter from "./DropdownFilter"; // Suponho que você tenha esse componente
import ButtonFilter from "./ButtonFilter"; // Importando o novo componente

export default function SidebarChi({ onFilterApply }) {
  const [anoSelecionado, setAnoSelecionado] = useState(null);
  const [regiaoSelecionado, setRegiaoSelecionado] = useState(null);
  const [ufSelecionado, setUFSelecionado] = useState(null);
  const [municipioSelecionado, setMunicipioSelecionado] = useState(null);
  const [catAdmSelecionado, setCatAdmSelecionado] = useState(null);
  const [iesSelecionado, setIesSelecionado] = useState(null);
  const [cursoSelecionado, setCursoSelecionado] = useState(null);
  const [variavelSelecionado, setVariavelSelecionado] = useState(null);
  const [alfaSelecionado, setAlfaSelecionado] = useState(null);


  // Função de validação para checar se todos os filtros estão preenchidos
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
      alfaSelecionado
    );
  };

  // Função que coleta os filtros e chama a função do componente pai
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
        alfa: alfaSelecionado
      };
      onFilterApply(appliedFilters); // Chama a função passada pelo componente pai
    }
  };

  return (
    <div className="sidebar">
      <h4>Filtros</h4>
      <DropdownFilter
        placeholder="Selecione o ano"
        onSelect={setAnoSelecionado}
        coluna="ano"
      />
      {anoSelecionado && (
        <DropdownFilter
          onSelect={setRegiaoSelecionado}
          placeholder="Selecione a região"
          queryParams={`coluna=dsc_regiao&ano=${anoSelecionado}`}
        />
      )}
      {regiaoSelecionado && (
        <DropdownFilter
          onSelect={setUFSelecionado}
          placeholder="Selecione a UF"
          queryParams={`coluna=dsc_uf&ano=${anoSelecionado}&regiao=${regiaoSelecionado}`}
        />
      )}
      {ufSelecionado && (
        <DropdownFilter
          onSelect={setMunicipioSelecionado}
          placeholder="Selecione o município"
          queryParams={`coluna=dsc_municipio&ano=${anoSelecionado}&regiao=${regiaoSelecionado}&uf=${ufSelecionado}`}
        />
      )}
      {municipioSelecionado && (
        <DropdownFilter
          onSelect={setCatAdmSelecionado}
          placeholder="Selecione a categoria adm"
          queryParams={`coluna=dsc_cat_adm&ano=${anoSelecionado}&regiao=${regiaoSelecionado}&uf=${ufSelecionado}&municipio=${municipioSelecionado}`}
        />
      )}
      {catAdmSelecionado && (
        <DropdownFilter
          onSelect={setIesSelecionado}
          placeholder="Selecione a IES"
          queryParams={`coluna=cod_ies&ano=${anoSelecionado}&regiao=${regiaoSelecionado}&uf=${ufSelecionado}&municipio=${municipioSelecionado}&cat_adm=${catAdmSelecionado}`}
        />
      )}
      {iesSelecionado && (
        <DropdownFilter
          onSelect={setCursoSelecionado}
          placeholder="Selecione o curso"
          queryParams={`coluna=dsc_grupo&ano=${anoSelecionado}&regiao=${regiaoSelecionado}&uf=${ufSelecionado}&municipio=${municipioSelecionado}&cat_adm=${catAdmSelecionado}&cod_ies=${iesSelecionado}`}
        />
      )}
      {cursoSelecionado && (
        <DropdownFilter
          onSelect={setVariavelSelecionado}
          placeholder="Selecione a varivavel"
          coluna="variavel"
          queryParams={`${anoSelecionado}`}
        />
      )}

      {variavelSelecionado && (
        <DropdownFilter
          onSelect={setAlfaSelecionado}
          placeholder="Selecione o alfa"
          coluna="alfa"
        />
      )}
      
      {/* Usando o ButtonFilter */}
      <ButtonFilter
        isFormValid={isFormValid()}
        onClick={handleFiltrar}
      />
    </div>
  );
}
