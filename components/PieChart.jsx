import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"; // Certifique-se de que a importação está assim

// Definindo algumas cores para os setores do gráfico
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

export default function PieChartComponent({ filters, variavel }) {
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        // Construção dos parâmetros da query
        const queryParams = new URLSearchParams({
          variavel,   // Passa a variável selecionada para o backend
          ...filters, // Passa os filtros aplicados
        });

        // Realiza a requisição para o backend
        const response = await fetch(`http://localhost:3001/graficos?${queryParams.toString()}`);
        if (!response.ok) {
          throw new Error(`Erro ao buscar dados: ${response.statusText}`);
        }

        const data = await response.json();

        // Verificar se os dados recebidos são válidos
        if (Array.isArray(data) && data.length > 0) {
          // Convertendo o percentual de string para número
          const formattedData = data.map(item => ({
            ...item,
            percentual: parseFloat(item.percentual) // Convertendo para número
          }));
          setClientData(formattedData);
        } else {
          console.error("Dados inválidos recebidos:", data);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchChartData();
  }, [filters, variavel]); // Reexecuta a requisição quando filtros ou a variável mudarem

  // Verifica se os dados estão sendo carregados
  if (!clientData) {
    return <div>Carregando...</div>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      {/* Exibe o título do gráfico, você pode ajustar conforme a variável */}
      <h2>Gráfico de Pizza - {variavel}</h2>

      {/* Exibe o gráfico de pizza com o percentual */}
      <PieChart width={220} height={220}>
        <Pie
          data={clientData}
          dataKey="percentual"  // Alterado para exibir o percentual
          nameKey="variavel"   // Mantém como 'variavel' para os nomes das fatias
          cx="50%"
          cy="50%"
          outerRadius={50}
          fill="#8884d8"
          label={({ percent }) => `${(percent * 100).toFixed(2)}%`} // Exibe o percentual sobre a fatia
        >
          {clientData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />  {/* Exibe os valores como percentual no Tooltip */}
        <Legend
          formatter={(value) => value} // Exibe apenas o nome da variável (sem o percentual) na legenda
          wrapperStyle={{
            fontSize: "10px", // Tamanho da fonte da legenda
            fontFamily: "Arial, sans-serif", // Fonte da legenda
            fontWeight: "normal", // Peso da fonte
          }}
        />
      </PieChart>
    </div>
  );
}
