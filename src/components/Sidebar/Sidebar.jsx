import React from "react";
import logo from "../../Assets/imagens/logo.png";
import { SideSection } from "./SideSection";
import { SideItem } from "./SideItem";

export function Sidebar() {
  return (
    <ul class="navbar-nav sidebar sidebar-light accordion" id="accordionSidebar">
      <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div class="sidebar-brand-icon">
          <img src={logo} alt="logo" />
        </div>
      </a>
      <hr class="sidebar-divider my-0" />
      <li class="nav-item active">
        <a class="nav-link" href="index.html">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Geral</span>
        </a>
      </li>

      <SideSection value="teste"></SideSection>

      <SideItem
        id="item1"
        value="Inicio"
        icons="far fa-fw fa-window-maximize"
        subName="Pog champ"
        subValues={["Medicos", "Enfeiros", "Administração", "Outros"]}
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
      <hr class="sidebar-divider" />
    </ul>
  );
}
