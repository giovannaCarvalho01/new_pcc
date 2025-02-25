// import PizzaChart from "../components/PizzaChart";
// import PieChart from "../components/PieChart";
// import BarVerticalChart from "../components/BarVerticalChart";
import dynamic from 'next/dynamic';

const PizzaChart = dynamic(() => import('../components/PizzaChart'), { ssr: false });
const PieChart = dynamic(() => import('../components/PieChart'), { ssr: false });
const BarVerticalChart = dynamic(() => import('../components/BarVerticalChart'), { ssr: false });

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
          <h4>Gráfico por Gênero</h4>
          <BarVerticalChart filters={filters} variavel={"sexo"} />
        </div>
        <div className="grafico">
          <h4>Gráfico por Cotas</h4>
          <PieChart filters={filters} variavel={"cotista"} />
        </div>
        <div className="grafico">
          <h4>Gráfico por Raça</h4>
          <PieChart filters={filters} variavel={"raca"} />
        </div>
        {/* <PizzaChart filters={filters} variavel={"estado_civil_dsc"} /> */}
      </div>

      <div className="superior" style={{ width: "100%" }}>
        <div className="grafico">
          <h4>Gráfico por Tipo do Ensino Médio</h4>
          <PizzaChart filters={filters} variavel={"tipo_em"} />
        </div>
        <div className="grafico">
          <h4>Gráfico por Categoria do Ensino Médio</h4>
          <PizzaChart filters={filters} variavel={"cat_em"} />
        </div>
        <div className="grafico">
          <h4>Gráfico por Turno</h4>
          <BarVerticalChart filters={filters} variavel={"dsc_turno"} />
        </div>
      </div>

      <div className="superior" style={{ width: "100%" }}>
        <div className="grafico">
          <h4>Gráfico por Horas Trabalhadas</h4>
          <PieChart filters={filters} variavel={"trabalha"} />
        </div>
        <div className="grafico">
          <h4>Gráfico por Quantidade de Livros Lidos</h4>
          <PieChart filters={filters} variavel={"qtd_livros"} />
        </div>
        <div className="grafico">
          <h4>Gráfico por Horas de Estudos</h4>
          <PizzaChart filters={filters} variavel={"horas_estudos"} />
        </div>
      </div> 

      <div className="superior" style={{ width: "100%" }}>
        <div className="grafico">
          <h4>Gráfico por Estado Civil</h4>
          <PieChart filters={filters} variavel={"estado_civil"} />
        </div>
        <div className="grafico">
          <h4>Gráfico por Tipo de Moradia</h4>
          <PieChart filters={filters} variavel={"tipo_moradia"} />
        </div>
        <div className="grafico">
          <h4>Gráfico por Quantidade de Moradores</h4>
          <PieChart filters={filters} variavel={"qtd_moradores"} />
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
