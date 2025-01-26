import PizzaChart from "../components/PizzaChart";

export default function Main({ filters }) {
  console.log("Props filters no Main:", filters); // Logando os filtros no Main

  // Verifica se os filtros estão aplicados e se a variável foi passada
  if (!filters || Object.keys(filters).length === 0) {
    return (
      <div className="placeholder">
        <p>Por favor, aplique os filtros para visualizar os gráficos.</p>
      </div>
    );
  }

  return (
    <div className="main">
      <div className="superior">
        <h2>Resultados dos Gráficos</h2>
      </div>
      <div className="inferior" style={{ width: "100%" }}>
        {/* Passando os filtros e a variável fixada como 'sexo_dsc' */}
        <PizzaChart filters={filters} variavel={"sexo_dsc"} />
      </div>
    </div>
  );
}
