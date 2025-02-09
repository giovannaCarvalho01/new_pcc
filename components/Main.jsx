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
        <div className="grafico">
          <PizzaChart filters={filters} variavel={"sexo"} />
        </div>
        <div className="grafico">
          <PizzaChart filters={filters} variavel={"cotista"} />
        </div>
        <div className="grafico">
          <PizzaChart filters={filters} variavel={"raca"} />
        </div>
        {/* <PizzaChart filters={filters} variavel={"estado_civil_dsc"} /> */}

      </div>
      <div className="superior" style={{ width: "100%" }}>
        <div className="grafico">
          <PizzaChart filters={filters} variavel={"tipo_em"} />
        </div>
        <div className="grafico">
          <PizzaChart filters={filters} variavel={"tipo_em"} />
        </div>
        <div className="grafico">
          <PizzaChart filters={filters} variavel={"tipo_em"} />
        </div>
        {/* Passando os filtros e a variável fixada como 'sexo_dsc' */}
        {/* <PizzaChart filters={filters} variavel={"sexo_dsc"} /> */}
      </div>
    </div>
  );
}
