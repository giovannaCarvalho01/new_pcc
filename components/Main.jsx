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
          <h4>Gráfico por sexo</h4>
          <PizzaChart filters={filters} variavel={"sexo"} />
        </div>
        <div className="grafico">
          <h4>Gráfico por cotas</h4>
          <PizzaChart filters={filters} variavel={"cotista"} />
        </div>
        <div className="grafico">
          <h4>Gráfico por raça</h4>
          <PizzaChart filters={filters} variavel={"raca"} />
        </div>
        {/* <PizzaChart filters={filters} variavel={"estado_civil_dsc"} /> */}
      </div>

      <div className="superior" style={{ width: "100%" }}>
        <div className="grafico">
          <h4>Gráfico por tipo do Ensino Médio</h4>
          <PizzaChart filters={filters} variavel={"tipo_em"} />
        </div>
        <div className="grafico">
          <h4>Gráfico por Categoria do Ensino Médio</h4>
          <PizzaChart filters={filters} variavel={"cat_em"} />
        </div>
        <div className="grafico">
          <h4>Gráfico por cotas</h4>
          <PizzaChart filters={filters} variavel={"dsc_turno"} />
        </div>
      </div>

      <div className="superior" style={{ width: "100%" }}>
        <div className="grafico">
          <h4>Gráfico por horas trabalhadas</h4>
          <PizzaChart filters={filters} variavel={"trabalha"} />
        </div>
        <div className="grafico">
          <h4>Gráfico por quantidade de livros lidos</h4>
          <PizzaChart filters={filters} variavel={"qtd_livros"} />
        </div>
        <div className="grafico">
          <h4>Gráfico por horas de estudos</h4>
          <PizzaChart filters={filters} variavel={"horas_estudos"} />
        </div>
      </div> 

      <div className="superior" style={{ width: "100%" }}>
        <div className="grafico">
          <h4>Gráfico por Estado Civil</h4>
          <PizzaChart filters={filters} variavel={"estado_civil"} />
        </div>
        <div className="grafico">
          <h4>Gráfico por Tipo de Moradia</h4>
          <PizzaChart filters={filters} variavel={"tipo_moradia"} />
        </div>
        <div className="grafico">
          <h4>Gráfico por Quantidade de Moradores</h4>
          <PizzaChart filters={filters} variavel={"qtd_moradores"} />
        </div>
      </div>  

      <div className="superior" style={{ width: "100%" }}>
        <div className="grafico">
          <h4>Gráfico de Escolaridade do Pai</h4>
          <PizzaChart filters={filters} variavel={"escolaridade_pai"} />
        </div>
        <div className="grafico">
          <h4>Gráfico de Escolaridade da Mãe</h4>
          <PizzaChart filters={filters} variavel={"escolaridade_mae"} />
        </div>
      </div>  

    </div>
  );
}
