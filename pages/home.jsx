import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Main from "../components/Main"
import Menu from "../components/Menu"

export default function home(){

    return (
        <div className="center">
            <div className="header">
                <Menu></Menu>
            </div>
            <div className="principal">
                <Sidebar></Sidebar>
                <Main></Main>
            </div>
        </div>
    )
}