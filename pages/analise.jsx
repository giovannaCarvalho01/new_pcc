// pages/analise.js
import Menu from "../components/Menu";
import Sidebar from "../components/Sidebar";
import MainAnalise from "../components/MainAnalise";
import { useState } from "react";

export default function Analise() {
  const [filters, setFilters] = useState(null); // Armazena os filtros aplicados

  const handleFilterApply = (appliedFilters) => {
    setFilters(appliedFilters); // Atualiza os filtros aplicados
    console.log(appliedFilters);
  };

  return (
    <div className="center">
      <div className="header">
        <Menu />
      </div>

      <div className="principal">
        <Sidebar onFilterApply={handleFilterApply} />
        <MainAnalise />
      </div>
    </div>
  );
}
