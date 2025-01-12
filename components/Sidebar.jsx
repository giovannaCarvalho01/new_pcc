import FilterText from "./FilterText"
import DropdownFilter from "./DropdownFilter"
import ButtonFilter from "./ButtonFilter"
import { useState } from "react"; // Importação do hook useState

export default function Sidebar(){
    const [anoSelecionado, setAnoSelecionado] = useState(null); // Estado para o ano selecionado

    const handleAnoSelect = (ano) => {
      console.log("Ano selecionado:", ano);
      setAnoSelecionado(ano); // Atualiza o estado do ano
    };
  
    const handleRegiaoSelect = (regiao) => {
      console.log("Região selecionada:", regiao);
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
                queryParams={`coluna=regiao&ano=${anoSelecionado}`} // Inclui o ano no queryParams
                />
            )}
            <DropdownFilter placeholder="Selecione a UF"/>
            <DropdownFilter placeholder="Selecione o municipio"/>            
            <DropdownFilter placeholder="Selecione a categoria adm"/>            
            <DropdownFilter placeholder="Selecione a IES"/>            
            <DropdownFilter placeholder="Selecione o curso"/>            

            {/* <FilterText placeholder="Digite o código do curso"></FilterText> */}
            <ButtonFilter />
        </div>
    )
}