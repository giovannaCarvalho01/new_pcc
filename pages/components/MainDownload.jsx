import TableView from "../components/TableView"

export default function MainDownload(){
    return (
        <div className="MainDownload">
            <div className="export">
                <button className="exportButton">Exportar para Xlsx</button>
            </div>
            <div className="table">
                <TableView />   
            </div>
        </div>
    )
}