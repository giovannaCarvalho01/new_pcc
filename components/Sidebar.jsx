import FilterText from "./FilterText"
import DropdownFilter from "./DropdownFilter"
import ButtonFilter from "./ButtonFilter"
import { useState } from "react"; // Importação do hook useState

export default function Sidebar(){
    const [anoSelecionado, setAnoSelecionado] = useState(null); // Estado para o ano selecionado
    const [regiaoSelecionado, setRegiaoSelecionado] = useState(null); // Estado para o ano selecionado
    const [ufSelecionado, setUFSelecionado] = useState(null); // Estado para o ano selecionado
    const [municipioSelecionado, setMunicipioSelecionado] = useState(null); // Estado para o ano selecionado
    const [catAdmSelecionado, setCatAdmSelecionado] = useState(null); // Estado para o ano selecionado
    const [iesSelecionado, setIesSelecionado] = useState(null); // Estado para o ano selecionado
    const [cursoSelecionado, setCursoSelecionado] = useState(null); // Estado para o ano selecionado

    const handleAnoSelect = (ano) => {
      console.log("Ano selecionado:", ano);
      setAnoSelecionado(ano); // Atualiza o estado do ano
    };
  
    const handleRegiaoSelect = (regiao) => {
      console.log("Região selecionada:", regiao);
      setRegiaoSelecionado(regiao);

    };

    const handleUFSelect = (uf) => {
      console.log("uf selecionada:", uf);
      setUFSelecionado(uf);

    };

    const handleMunicipioSelect = (municipio) => {
      console.log("municipio selecionada:", municipio);
      setMunicipioSelecionado(municipio);

    };

    const handleCatAdmSelect = (catAdm) => {
      console.log("catAdm selecionada:", catAdm);
      setCatAdmSelecionado(catAdm);

    };

    const handleIESSelect = (ies) => {
      console.log("ies selecionada:", ies);
      setIesSelecionado(ies);

    };

    const handleCursoSelect = (curso) => {
      console.log("curso selecionada:", curso);
      setCursoSelecionado(curso);

    };

    return(
        <div className="sidebar">
            <h4>Filtros</h4>
            <DropdownFilter 
            placeholder="Selecione o ano" 
            onSelect={handleAnoSelect} 
            coluna="ano"
            />
            {/* Condicional para exibir o Dropdown de região */}
            {anoSelecionado && (
                <DropdownFilter
                onSelect={handleRegiaoSelect}
                placeholder="Selecione a região"
                queryParams={`coluna=dsc_regiao_completo&ano=${anoSelecionado}`} // Inclui o ano no queryParams
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
              placeholder="Selecione o municipio"
              queryParams={`coluna=dsc_municipio&ano=${anoSelecionado}&regiao=${regiaoSelecionado}&uf=${ufSelecionado}`}
              />
            )}            
            {municipioSelecionado && (
              <DropdownFilter 
              onSelect={handleCatAdmSelect}
              placeholder="Selecione a categoria adm"
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
            {/* <FilterText placeholder="Digite o código do curso"></FilterText> */}
            <ButtonFilter />
        </div>
    )
}