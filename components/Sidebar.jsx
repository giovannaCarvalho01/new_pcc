import { useState } from "react"; // Importação do hook useState
import DropdownFilter from "./DropdownFilter"; // Assumindo que você tem esses componentes
import ButtonFilter from "./ButtonFilter";

export default function Sidebar({ onFilterApply }) {
  const [anoSelecionado, setAnoSelecionado] = useState(null);
  const [regiaoSelecionado, setRegiaoSelecionado] = useState(null);
  const [ufSelecionado, setUFSelecionado] = useState(null);
  const [municipioSelecionado, setMunicipioSelecionado] = useState(null);
  const [catAdmSelecionado, setCatAdmSelecionado] = useState(null);
  const [iesSelecionado, setIesSelecionado] = useState(null);
  const [cursoSelecionado, setCursoSelecionado] = useState(null);

  // Função de validação para checar se todos os filtros estão preenchidos
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
          queryParams={`coluna=dsc_regiao_completo&ano=${anoSelecionado}`}
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
          queryParams={`coluna=dsc_grp&ano=${anoSelecionado}&regiao=${regiaoSelecionado}&uf=${ufSelecionado}&municipio=${municipioSelecionado}&cat_adm=${catAdmSelecionado}&cod_ies=${iesSelecionado}`}
        />
      )}
      <button
        className={`btnFiltrar ${!isFormValid() ? "disabled" : ""}`}
        onClick={handleFiltrar}
        disabled={!isFormValid()}
      >
        Filtrar
      </button>
    </div>
  );
}
