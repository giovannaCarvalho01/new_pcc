import PieChart from "../components/PieChart"
import LineChart from "../components/LineChart"

export default function Main(){
    return (
        <div className="main">
            <div className="superior">
                <PieChart></PieChart>
                <PieChart></PieChart>
                <PieChart></PieChart>
            </div>
            <div className="inferior">
                <LineChart></LineChart>
            </div>
        </div>
    )
}