import Menu from "../components/Menu"
import Sidebar from "../components/Sidebar"
import MainDownload from "../components/MainDownload"

export default function download(){
    return (
        <div className="center">
            <div className="header">
                <Menu></Menu>
            </div>
            <div className="principal">
                <Sidebar></Sidebar>
                <MainDownload />
            </div>
        </div>
    )
}