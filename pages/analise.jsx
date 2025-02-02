import Menu from "../components/Menu";
import SidebarChi from "../components/SidebarChi";
import MainAnalise from "../components/MainAnalise";
import { useState } from "react";

export default function Analise() {
  const [filters, setFilters] = useState(null); // Armazena os filtros aplicados

  const handleFilterApply = (appliedFilters) => {
    setFilters(appliedFilters); // Atualiza os filtros aplicados
    console.log("Filtros aplicados:", appliedFilters);
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
