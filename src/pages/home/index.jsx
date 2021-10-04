import CardMenuHome from "../../components/CardMenuHome";
import Table from "../../components/Table";
import "./styles.scoped.scss";
import React from "react";
import { api } from "../../services/api";
import { setDoctors } from "../../store/actions/doctor.action";
import { connect } from "react-redux";
import { notification } from "../../services/toastify";
import types from "../../services/types";
import Button from "../../components/Button/Button";

function Home({ populateDoctors, doctors }) {
    React.useEffect(() => {
        async function loadDoctors() {
            try {
                const { data } = await api.get("/user/doctor");
                populateDoctors(data);
            } catch (error) {
                console.log(error);
                notification(types.ERROR, error.message);
            }
        }

        loadDoctors();
    }, [populateDoctors]);

    return (
        <div className="container">
            <section id="cards">
                <span>
                    <CardMenuHome title="Médicos" icon="vaadin:doctor" quant={doctors.length} active />
                </span>
                <span>
                    <CardMenuHome title="Enfermeiros" icon="wpf:medical-doctor" quant={100} />
                </span>
                <span>
                    <CardMenuHome title="Administração" icon="wpf:administrator" quant={100} />
                </span>
                <span>
                    <CardMenuHome title="Pacientes" icon="fluent:doctor-48-filled" quant={100} />
                </span>
            </section>
            <section id="buttons">
                <Button text="Adicionar médico" color="cyan" />
            </section>
            <section id="table">
                <Table header={["Id", "Nome", "Email", "CRM", "Área", "Sexo", "Telefone"]} doctors={doctors} />
            </section>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        populateDoctors(doctors) {
            const action = setDoctors(doctors);
            dispatch(action);
        },
    };
};

const mapStateToProps = (states) => {
    return {
        doctors: states.doctors,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
