import { useState } from "react";
import Menu from "../components/Menu";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";

export default function Dashboard() {
  const [filters, setFilters] = useState({}); // Agora useState vai funcionar corretamente

  console.log("filters antes de setar:", filters);

  const handleFilterApply = (appliedFilters) => {
    console.log("Filtros aplicados:", appliedFilters);
    setFilters(appliedFilters); // Atualiza os filtros aplicados
  };

  console.log("Renderizando Dashboard com filters:", filters);

  return (
    <div className="center">
      <div className="header">
        <Menu />
      </div>
      <div className="principal">
        <Sidebar onFilterApply={handleFilterApply} />
        <Main filters={filters} /> {/* Passando os filtros para o Main */}
      </div>
    </div>
  );
}
