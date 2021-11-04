import React from "react";

import "./styles.scoped.scss";
import { Icon } from "@iconify/react";
import Button from "../Button/Button";
import { api } from "../../services/api";
import { connect } from "react-redux";
import { clearStore } from "../../store/actions/app.action";
import { useHistory } from "react-router";

function NavBar({ logoff, user }) {
    const history = useHistory();

    async function handleLogoff() {
        await api.get("logoff");
        logoff();
    }

    return (
        <header className="container">
            <img src="/logo_mini.svg" alt="logo" onClick={() => (history.location !== "/" ? history.push("/") : "")} />
            <span id="space" />
            <section id="menu_drop">
                <header>
                    <Icon id="icon-user" icon="carbon:user-avatar-filled-alt" />
                    <div>{user.name}</div>
                    <Icon id="icon-drop" icon="bx:bxs-down-arrow-circle" />
                </header>

                <div id="button-area">
                    {user.groupId === 5 ? (
                        <div>
                            <Button
                                text="Perfil"
                                color="cyan"
                                handle={() => {}}
                                styles={{ height: "fit-content", padding: "5px" }}
                            />
                        </div>
                    ) : (
                        ""
                    )}

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
