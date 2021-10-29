import React from "react";

import "./styles.scoped.scss";
import { connect } from "react-redux";

function CardNurseInformation({ user }) {
    return (
        <section className="container">
            <p>
                <span>Nome:</span> {user.name}
            </p>
            <p>
                <span>COREN:</span> {user.Nurse.coren}
            </p>
            <p>
                <span>Contato:</span> {user.phone}
            </p>
        </section>
    );
}

const mapStateToProps = (states) => {
    return {
        user: states.user,
    };
};

export default connect(
    mapStateToProps,
    null
)(CardNurseInformation);
