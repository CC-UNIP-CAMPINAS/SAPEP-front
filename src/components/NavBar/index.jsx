import React from "react";

import "./styles.scoped.scss";
import { Icon } from "@iconify/react";
import Button from "../Button/Button";
import { api } from "../../services/api";
import { connect } from "react-redux";
import { clearStore } from "../../store/actions/app.action";

function NavBar({ logoff, user }) {
    async function handleLogoff() {
        await api.get("logoff");
        logoff();
    }

    return (
        <header className="container">
            <img src="/logo_mini.svg" alt="logo" />
            <span id="space" />
            <section id="menu_drop">
                <header>
                    <Icon id="icon-user" icon="carbon:user-avatar-filled-alt" />
                    <div>{user.name}</div>
                    <Icon id="icon-drop" icon="bx:bxs-down-arrow-circle" />
                </header>

                <div id="button-area">
                    <Button text="Sair" color="cyan" handle={handleLogoff} />
                </div>
            </section>
        </header>
    );
}

const mapStateToProps = (states) => {
    return {
        user: states.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logoff() {
            const action = clearStore();
            dispatch(action);
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar);
