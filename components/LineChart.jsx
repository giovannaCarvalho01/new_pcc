// export default function LineChart(){
//     return(
//         <div className="lineChart">
//             lineChart
//         </div>
//     )
// }

import React, { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Dados de exemplo para o gráfico de linha
const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
]

export default function LineChartComponent({ data }) {
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    if (data) {
      setClientData(data);
    }
  }, [data]);

  if (!clientData) {
    return <div>Carregando...</div>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h4>Line Chart</h4>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={clientData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
