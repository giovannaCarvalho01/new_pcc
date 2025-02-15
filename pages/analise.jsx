import Menu from "../components/Menu";
import SidebarChi from "../components/SidebarChi";
import MainAnalise from "../components/MainAnalise";
import { useState } from "react";

export default function Analise() {
  const [filters, setFilters] = useState(null); // Armazena os filtros aplicados

  // Mapeamento de valores de variavel
  const variavelMapping = {
    "Plano de Ensino": "plano_ensino",
    "Condição da Sala": "cond_sala", // Adicione mais conforme necessário
    // Adicione outros valores aqui...
  };

  const handleFilterApply = (appliedFilters) => {
    // Ajusta o filtro 'variavel' com base no valor selecionado
    const updatedFilters = { ...appliedFilters };

    // Verifica se a chave 'variavel' existe no filtro e substitui seu valor
    if (updatedFilters.variavel && variavelMapping[updatedFilters.variavel]) {
      updatedFilters.variavel = variavelMapping[updatedFilters.variavel];
    }

    // Atualiza o estado com os filtros ajustados
    setFilters(updatedFilters);
    // console.log("Filtros aplicados:", updatedFilters);
    // console.log(filters?.alfa);
  };

  return (
    <div className="center">
      <div className="header">
        <Menu />
      </div>

      <div className="principal">
        <SidebarChi onFilterApply={handleFilterApply} />
        <MainAnalise filters={filters} /> {/* Passa os filtros para o MainAnalise */}
      </div>
    </div>
  );
}
