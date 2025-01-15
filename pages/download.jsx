import Menu from "../components/Menu";
import Sidebar from "../components/Sidebar";
import MainDownload from "../components/MainDownload";
import { useState } from "react";

export default function download() {
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
        <MainDownload filters={filters} /> {/* Passa os filtros para MainDownload */}
      </div>
    </div>
  );
}
