import Menu from "../components/Menu"
import FilterSystem from "../components/FilterSystem"

export default function comparativo(){
    return (
        <div className="center">
            <div className="header">
                <Menu></Menu>
            </div>
            <div className="principal">
                {/* Em construção... Irá virar doc */}
                <FilterSystem />
            </div>
        </div>
    )
}