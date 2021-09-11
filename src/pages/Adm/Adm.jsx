import React from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb";

export function Adm() {
  return (
    <div id="wrapper">
      <Sidebar></Sidebar>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Topbar></Topbar>
          <div class="container-fluid" id="container-wrapper">
            {/*Todo conteudo vai aqui dentro*/}
            <Breadcrumb current="Visão Geral" father="Início"></Breadcrumb>
          </div>
        </div>
      </div>
    </div>
  );
}
