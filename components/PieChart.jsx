import { useEffect, useState } from "react";
import Plot from "react-plotly.js";  // Importando o componente Plot do Plotly

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

  const colors = ["#FF8042", "#FFBB28", "#0088FE", "#00C49F", "#FF8042", "#8DFF42", "#604F98"];

  // Preparar os dados para o gráfico de pizza do Plotly
  const labels = clientData.map(item => item.variavel);  // "Feminino", "Masculino"
  const values = clientData.map(item => item.percentual);  // Percentual (73.13, 26.87, etc.)

  return (
    <div style={{ textAlign: "center" }}>
      {/* Exibe o título do gráfico */}
      {/* <h2>Gráfico de Pizza - {variavel}</h2> */}

      {/* Usando Plotly para renderizar o gráfico de pizza */}
      <Plot
        data={[
          {
            type: "pie",
            labels: labels,  // Labels para as fatias (Feminino, Masculino, etc.)
            values: values,  // Percentuais correspondentes
            hoverinfo: "label+percent",  // Exibe o rótulo e o percentual ao passar o mouse
            // textinfo: "label+percent",  // Exibe o rótulo e o percentual no gráfico
            textposition: "inside",  // Posição do texto dentro da fatia
            hole: 0.4,  // Para gráficos de pizza com buraco no meio (como gráfico de rosquinha)
            marker: {
              colors: colors
            },
          },
        ]}
        layout={{
          height: 400,  // Altura do gráfico
          width: 400,   // Largura do gráfico
          title: "Distribuição de " + variavel,  // Título do gráfico
          showlegend: true,  // Exibe a legenda
          legend: {
            font: { size: 10 },  // Tamanho da fonte da legenda
            orientation: "h",    // Layout horizontal da legenda
          },
        }}
      />
    </div>
  );
}
