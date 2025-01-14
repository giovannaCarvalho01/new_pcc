import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import Menu from "../components/Menu";

export default function home() {
  const [filters, setFilters] = useState(null); // Armazena os filtros aplicados

  const handleFilterApply = (appliedFilters) => {
    setFilters(appliedFilters); // Atualiza os filtros aplicados
  };

  return (
    <div className="center">
      <div className="header">
        <Menu />
      </div>
      <div className="principal">
        <Sidebar onFilterApply={handleFilterApply} />
        <Main filters={filters} />
      </div>
    </div>
  );
}
