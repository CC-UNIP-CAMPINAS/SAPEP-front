import React from "react";
import { TopItem } from "./TopItem";
import { TopUser } from "./TopUser";

export function Topbar() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-navbar topbar mb-4 static-top">
      <button id="sidebarToggleTop" className="btn btn-link rounded-circle mr-3">
        <i className="fa fa-bars"></i>
      </button>
      <ul className="navbar-nav ml-auto">
        <TopItem
          id="alertsDropdown"
          icon="fas fa-bell fa-fw"
          isAlert={true}
          subName="Central de Alertas"
          subObject={[
            {
              icon: "fas fa-file-alt",
              date: "04 Novembro",
              value: "A new monthly report is ready to download!",
            },
            {
              icon: "fas fa-donate",
              date: "08 Novembro",
              value: "Olha parece que deu certo xDD",
            },
          ]}
        ></TopItem>
        <TopItem
          id="messagesDropdown2"
          icon="fas fa-envelope fa-fw"
          isAlert={false}
          subName="Central de Mensagens"
          subObject={[
            {
              src: "https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/e/5/5/1/e551fc6eb958a7c35d087e4be43170bb-tb2.jpg",
              date: "Roberto Carlos · 58m",
              value: "Como É Grande o Meu Amor Por Você",
            },
            {
              src: "https://s2.glbimg.com/-9l9E0k6D_JNJi-RonzfCJVfhrs=/512x320/smart/e.glbimg.com/og/ed/f/original/2018/05/28/joanna-darc.jpg",
              date: "Joana · 2d",
              value: "Olha parece que deu certo xDD",
            },
            {
              src: "https://pbs.twimg.com/profile_images/1242930634579902465/uPqiOajS_400x400.jpg",
              date: "Bozo Naro",
              value: "Send Nudes plz ",
            },
          ]}
        ></TopItem>

        <div className="topbar-divider d-none d-sm-block"></div>
        <TopUser></TopUser>
      </ul>
    </nav>
  );
}
