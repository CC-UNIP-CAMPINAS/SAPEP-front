import React from "react";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Topbar } from "../components/Topbar/Topbar";

export function Adm() {
  return (
    <div id="wrapper">
      <Sidebar></Sidebar>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Topbar></Topbar>
        </div>
      </div>
    </div>
  );
}
