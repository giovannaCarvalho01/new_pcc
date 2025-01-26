import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const PizzaChart = ({ filters, variavel }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cores personalizadas para cada fatia
  const COLORS = [
    "#0088FE", "#FF8042", "#00C49F", "#FFBB28", "#FF8042", 
    "#FF6347", "#8A2BE2", "#20B2AA", "#D2691E", "#FF4500"
  ];

  useEffect(() => {
    // Evita a chamada da API se não houver filtros ou variável
    if (Object.keys(filters).length === 0 || !variavel) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Preparar a query de filtros e a variável
        const queryParams = new URLSearchParams({ ...filters, variavel }).toString();
        const response = await fetch(`http://localhost:3001/graficos?${queryParams}`);
        
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
  }, [filters, variavel]); // Executa a chamada sempre que filtros ou variável mudam

  // Exibe um carregamento enquanto busca os dados
  if (loading) {
    return <div>Carregando gráfico...</div>;
  }

  // Exibe uma mensagem de erro caso algo dê errado
  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div style={{ width: "100%", height: "200px" }}>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="quantidade" // Exemplo de uso de "quantidade" para o valor
          nameKey="variavel" // Exemplo de uso de "variavel" para o nome
          cx="50%"
          cy="50%"
          outerRadius={75}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PizzaChart;
