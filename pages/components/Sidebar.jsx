import FilterText from "./FilterText"
import DropdownFilter from "./DropdownFilter"
import ButtonFilter from "./ButtonFilter"


export default function Sidebar(){
    return(
        <div className="sidebar">
            <h4>Filtros</h4>
            <DropdownFilter placeholder="Selecione o ano"/>
            <FilterText placeholder="Digite o código do curso"></FilterText>
            <ButtonFilter />
        </div>
    )
}