import Menu from "../components/Menu"
import Agrupamento from "../components/Agrupamento"

export default function comparativo(){
    return (
        <div className="center">
            <div className="header">
                <Menu></Menu>
            </div>
            <div className="principal">
                {/* <Sidebar></Sidebar> */}
                <Agrupamento />
                {/* Em construção... Irá virar doc */}
            </div>
        </div>
    )
}