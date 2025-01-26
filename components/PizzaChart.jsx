import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

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
  }, [filters, variavel]);

  if (loading) {
    return <div>Carregando gráfico...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ flex: 1, paddingRight: '20px' }}>
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            dataKey="quantidade"
            nameKey="variavel"
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
        </PieChart>
      </div>
      
      <Legend
        layout="vertical"
        verticalAlign="middle"
        align="right"
        wrapperStyle={{
          top: '0',
          left: '10px',
          lineHeight: '20px',
          maxHeight: '300px', // Limite de altura para as legendas
          overflowY: 'auto', // Permite rolar as legendas se necessário
        }}
      />
    </div>
  );
};

export default PizzaChart;
