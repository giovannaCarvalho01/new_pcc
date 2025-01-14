import FilterText from "./FilterText";
import DropdownFilter from "./DropdownFilter";
import ButtonFilter from "./ButtonFilter";
import { useState } from "react";

export default function Sidebar({ onFilterApply }) {
  const [anoSelecionado, setAnoSelecionado] = useState(null); 
  const [regiaoSelecionado, setRegiaoSelecionado] = useState(null); 
  const [ufSelecionado, setUFSelecionado] = useState(null); 
  const [municipioSelecionado, setMunicipioSelecionado] = useState(null); 
  const [catAdmSelecionado, setCatAdmSelecionado] = useState(null); 
  const [iesSelecionado, setIesSelecionado] = useState(null); 
  const [cursoSelecionado, setCursoSelecionado] = useState(null); 

  const handleAnoSelect = (ano) => {
    setAnoSelecionado(ano);
  };

  const handleRegiaoSelect = (regiao) => {
    setRegiaoSelecionado(regiao);
  };

  const handleUFSelect = (uf) => {
    setUFSelecionado(uf);
  };

  const handleMunicipioSelect = (municipio) => {
    setMunicipioSelecionado(municipio);
  };

  const handleCatAdmSelect = (catAdm) => {
    setCatAdmSelecionado(catAdm);
  };

  const handleIESSelect = (ies) => {
    setIesSelecionado(ies);
  };

  const handleCursoSelect = (curso) => {
    setCursoSelecionado(curso);
  };

  const handleApplyFilters = () => {
    // Envia os filtros aplicados para o componente pai
    onFilterApply({
      ano: anoSelecionado,
      regiao: regiaoSelecionado,
      uf: ufSelecionado,
      municipio: municipioSelecionado,
      catAdm: catAdmSelecionado,
      ies: iesSelecionado,
      curso: cursoSelecionado,
    });
  };

  return (
    <div className="sidebar">
      <h4>Filtros</h4>
      <DropdownFilter
        placeholder="Selecione o ano"
        onSelect={handleAnoSelect}
        coluna="ano"
      />
      {anoSelecionado && (
        <DropdownFilter
          onSelect={handleRegiaoSelect}
          placeholder="Selecione a região"
          queryParams={`coluna=dsc_regiao_completo&ano=${anoSelecionado}`}
        />
      )}
      {regiaoSelecionado && (
        <DropdownFilter
          onSelect={handleUFSelect}
          placeholder="Selecione a UF"
          queryParams={`coluna=dsc_uf&ano=${anoSelecionado}&regiao=${regiaoSelecionado}`}
        />
      )}
      {ufSelecionado && (
        <DropdownFilter
          onSelect={handleMunicipioSelect}
          placeholder="Selecione o município"
          queryParams={`coluna=dsc_municipio&ano=${anoSelecionado}&regiao=${regiaoSelecionado}&uf=${ufSelecionado}`}
        />
      )}
      {municipioSelecionado && (
        <DropdownFilter
          onSelect={handleCatAdmSelect}
          placeholder="Selecione a categoria administrativa"
          queryParams={`coluna=dsc_cat_adm&ano=${anoSelecionado}&regiao=${regiaoSelecionado}&uf=${ufSelecionado}&municipio=${municipioSelecionado}`}
        />
      )}
      {catAdmSelecionado && (
        <DropdownFilter
          onSelect={handleIESSelect}
          placeholder="Selecione a IES"
          queryParams={`coluna=cod_ies&ano=${anoSelecionado}&regiao=${regiaoSelecionado}&uf=${ufSelecionado}&municipio=${municipioSelecionado}&cat_adm=${catAdmSelecionado}`}
        />
      )}
      {iesSelecionado && (
        <DropdownFilter
          onSelect={handleCursoSelect}
          placeholder="Selecione o curso"
          queryParams={`coluna=dsc_grp&ano=${anoSelecionado}&regiao=${regiaoSelecionado}&uf=${ufSelecionado}&municipio=${municipioSelecionado}&cat_adm=${catAdmSelecionado}&cod_ies=${iesSelecionado}`}
        />
      )}
      {/* Botão para aplicar os filtros */}
      <button onClick={handleApplyFilters}>Filtrar</button>
    </div>
  );
}
