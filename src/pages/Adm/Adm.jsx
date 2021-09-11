import React from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb";
import { Card } from "../../components/Card/Card";

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
            <div class="row mb-3">
              <Card type="small" category="Médicos" quantity="45 Registros" update="11/11"></Card>
              <Card type="small" category="Enfermeiros" quantity="75 Registros" update="07/08"></Card>
              <Card type="small" category="Pacientes" quantity="450 Registros" update="12/08"></Card>
              <Card type="small" category="Administradores" quantity="28 Registros" update="08/09"></Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
