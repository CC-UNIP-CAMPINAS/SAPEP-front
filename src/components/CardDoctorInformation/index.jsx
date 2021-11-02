import React from "react";

import "./styles.scoped.scss";
import { connect } from "react-redux";

function CardDoctorInformation({ user }) {
    return (
        <section className="container">
            <p>
                <span>Nome:</span> {user.name}
            </p>
            <p>
                <span>CRM:</span> {user.Doctor.crm}
            </p>
            <p>
                <span>Área:</span> {user.Doctor.area}
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
)(CardDoctorInformation);
