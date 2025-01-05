// export default function PieChart(){
//     return(
//         <div className="pieChart">
//             pieChart
//         </div>
//     )
// }

import React, { useEffect, useState } from "react"
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"

// Cores para os setores do gráfico
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"]

export default function PieChartComponent({ data }) {
  const [clientData, setClientData] = useState(null);

  // Verifica se os dados foram recebidos no lado do cliente
  useEffect(() => {
    if (data) {
      setClientData(data);
    }
  }, [data]);  // Atualiza quando os dados estiverem disponíveis

  // Renderiza um estado inicial vazio enquanto os dados estão sendo carregados
  if (!clientData) {
    return <div>Carregando...</div>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      {/* <h1>Gráfico de Pizza</h1> */}
      <PieChart width={220} height={220}>
        <Pie
          data={clientData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={50}
          fill="#8884d8"
          label
        >
          {clientData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
        wrapperStyle={{
        fontSize: "10px", // Tamanho da fonte da legenda
        fontFamily: "Arial, sans-serif", // Fonte da legenda
        fontWeight: "normal", // Peso da fonte
        }} 
        />
      </PieChart>
    </div>
  )
}
