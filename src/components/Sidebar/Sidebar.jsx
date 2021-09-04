import React from "react";
import logo from "../../assets/img/logo.png";
import { SideSection } from "./SideSection";
import { SideItem } from "./SideItem";

export function Sidebar() {
    return (
        <ul className="navbar-nav sidebar sidebar-light accordion" id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon">
                    <img src={logo} alt="logo" />
                </div>
            </a>
            <hr className="sidebar-divider my-0" />
            <li className="nav-item active">
                <a className="nav-link" href="index.html">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Geral</span>
                </a>
            </li>

            <SideSection value="teste"></SideSection>

            <SideItem
                id="item1"
                value="Inicio"
                icons="far fa-fw fa-window-maximize"
                subName="Pog champ"
                subValues={["Medicos", "Enfermeiros", "Administração", "Outros"]}
            ></SideItem>

            <SideItem
                id="item2"
                value="SegundoValor"
                icons="fab fa-fw fa-wpforms"
                subName="Pog champ2"
                subValues={["Teste1", "Teste2", "Teste3"]}
            ></SideItem>

            <SideItem id="item2" value="Terceiro Item" icons="fab fa-fw fa-wpforms"></SideItem>

            <SideSection value="Exemplos"></SideSection>
            <SideItem
                id="item3"
                value="SegundoValor"
                icons="fab fa-fw fa-wpforms"
                subName="Pog champ2"
                subValues={["Teste1", "Teste2", "Teste3"]}
            ></SideItem>

            <SideItem id="item4" value="Terceiro Item" icons="fab fa-fw fa-wpforms"></SideItem>
            <hr className="sidebar-divider" />
        </ul>
    );
}
