import PieChartComponent from "../components/PieChart"
// import PieChart from "../components/PieChart"
import LineChartComponent from "../components/LineChart"
// import LineChart from "../components/LineChart"

  
  // Função do componente Main
  export default function Main({ data }) {

    const datas = [
        { name: "Chrome", value: 275 },
        { name: "Safari", value: 200 },
        { name: "Firefox", value: 287 },
        { name: "Edge", value: 173 },
        { name: "Other", value: 190 },
    ]

    // Mock dos dados para o gráfico de linha
    const lineData = [
        { name: 'Jan', value: 4000 },
        { name: 'Feb', value: 3000 },
        { name: 'Mar', value: 2000 },
        { name: 'Apr', value: 2780 },
        { name: 'May', value: 1890 },
        { name: 'Jun', value: 2390 },
        { name: 'Jul', value: 3490 },
    ]

    return (
      <div className="main">
        <div className="superior">
          <PieChartComponent data={datas} /> 
          <PieChartComponent data={datas} /> 
          <PieChartComponent data={datas} /> 
        </div>
        <div className="inferior">
          <LineChartComponent data={lineData} />
        </div>
      </div>
    )
  }