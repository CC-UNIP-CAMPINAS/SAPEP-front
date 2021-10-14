import React from "react";
import { connect } from "react-redux";
import CardMenuHome from "../../components/CardMenuHome";
import TableNurse from "../../components/TableNurse";
import { api } from "../../services/api";
import { notification } from "../../services/toastify";
import types from "../../services/types";
import { setDoctors } from "../../store/actions/doctor.action";
import { setNurses } from "../../store/actions/nurse.action";
import "./styles.scoped.scss";

function Home({ populateDoctors, doctors, populateNurses, nurses }) {
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

        async function loadNurses() {
            try {
                const { data } = await api.get("/user/nurse");
                populateNurses(data);
            } catch (error) {
                console.log(error);
                notification(types.ERROR, error.message);
            }
        }
        
        loadDoctors();
        loadNurses();
    }, [populateDoctors, populateNurses]);

    return (
        <div className="container">
            <section id="cards">
                <span>
                    <CardMenuHome title="Médicos" icon="vaadin:doctor" quant={doctors.length} active />
                </span>
                <span>
                    <CardMenuHome title="Enfermeiros" icon="wpf:medical-doctor" quant={nurses.length} />
                </span>
                <span>
                    <CardMenuHome title="Administração" icon="wpf:administrator" quant={100} />
                </span>
                <span>
                    <CardMenuHome title="Pacientes" icon="fluent:doctor-48-filled" quant={100} />
                </span>
            </section>
            <section id="table">
                <TableNurse />
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
        populateNurses(nurses) {
            const action = setNurses(nurses);
            dispatch(action);
        },
    };
};

const mapStateToProps = (states) => {
    return {
        doctors: states.doctors,
        nurses: states.nurses,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
