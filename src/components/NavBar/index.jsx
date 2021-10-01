import React from "react";

import "./styles.scoped.scss";
import { Icon } from "@iconify/react";
import Button from "../Button/Button";

function NavBar() {
    return (
        <header className="container">
            <img src="/logo_mini.svg" alt="logo" />
            <span id="space" />
            <section id="menu_drop">
                <header>
                    <Icon id="icon-user" icon="carbon:user-avatar-filled-alt" />
                    <div>Leonardo Petta do Nascimento</div>
                    <Icon icon="bx:bxs-down-arrow" />
                </header>

                <div id="button-area">
                    <Button text="Sair" color="cyan" />
                </div>
            </section>
        </header>
    );
}

export default NavBar;
