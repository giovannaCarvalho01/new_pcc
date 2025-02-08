import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { API_BASE_URL_PRD } from "../config"; // Importando a URL base

const PizzaChart = ({ filters, variavel }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cores personalizadas para cada fatia
  const COLORS = [
    "#0088FE", "#FF8042", "#00C49F", "#FFBB28", 
    "#8A2BE2", "#20B2AA", "#D2691E", "#FF4500"
  ];

  useEffect(() => {
    if (Object.keys(filters).length === 0 || !variavel) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams({ ...filters, variavel }).toString();
        const response = await fetch(`${API_BASE_URL_PRD}graficos?presenca=555&${queryParams}`);
        
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados");
        }

        const result = await response.json();
        setData(result); // Atualiza os dados com a resposta
      } catch (err) {
        setError(err.message); // Atualiza erro em caso de falha
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters, variavel]);

  if (loading) {
    return <div>Carregando gráfico...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className="flex justify-center items-center flex-row">
      {/* Gráfico */}
      <PieChart width={350} height={350}>
        <Pie
          data={data}
          cx={200}
          cy={150}
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="quantidade" // Dados para os valores
          nameKey="variavel"   // Nome que será exibido na legenda
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </div>
  );
};

export default PizzaChart;
