import React from "react";
import { connect } from "react-redux";
import CardMenuHome from "../../components/CardMenuHome";
import TableAdm from "../../components/TableAdm";
import TableDoctor from "../../components/TableDoctor";
import TableNurse from "../../components/TableNurse";
import TablePatient from "../../components/TablePatient";
import { api } from "../../services/api";
import { notification } from "../../services/toastify";
import types from "../../services/types";
import { setAdms } from "../../store/actions/adm.action";
import { setDoctors } from "../../store/actions/doctor.action";
import { setNurses } from "../../store/actions/nurse.action";
import "./styles.scoped.scss";

function Home({ populateDoctors, doctors, populateNurses, nurses, adms, patients, populateAdms }) {
    const [selectedTable, setSelectedTable] = React.useState("DOCTOR");
    const [activeMenu, setActiveMenu] = React.useState({
        doctor: false,
        nurse: false,
        adm: false,
        patient: false,
    });

    React.useEffect(() => (document.title = "SAPEP - Home"), []);

    React.useEffect(() => {
        const defaultState = {
            doctor: false,
            nurse: false,
            adm: false,
            patient: false,
        };

        switch (selectedTable) {
            case "NURSE":
                return setActiveMenu({ ...defaultState, nurse: true });
            case "ADM":
                return setActiveMenu({ ...defaultState, adm: true });
            case "PATIENT":
                return setActiveMenu({ ...defaultState, patient: true });
            default:
                //DOCTOR
                return setActiveMenu({ ...defaultState, doctor: true });
        }
    }, [selectedTable]);

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

        async function loadAdms() {
            try {
                const { data } = await api.get("/user/adm");
                populateAdms(data);
            } catch (error) {
                console.log(error);
                notification(types.ERROR, error.message);
            }
        }

        loadDoctors();
        loadNurses();
        loadAdms();
    }, [populateDoctors, populateNurses, populateAdms]);

    function switchTable() {
        switch (selectedTable) {
            case "NURSE":
                return <TableNurse />;
            case "ADM":
                return <TableAdm />;
            case "PATIENT":
                return <TablePatient />;
            default:
                //DOCTOR
                return <TableDoctor />;
        }
    }

    return (
        <div className="container">
            <section id="cards">
                <span>
                    <CardMenuHome
                        title="M??dicos"
                        icon="vaadin:doctor"
                        quant={doctors.length}
                        handle={() => setSelectedTable("DOCTOR")}
                        active={activeMenu.doctor}
                    />
                </span>
                <span>
                    <CardMenuHome
                        title="Enfermeiros"
                        icon="wpf:medical-doctor"
                        quant={nurses.length}
                        handle={() => setSelectedTable("NURSE")}
                        active={activeMenu.nurse}
                    />
                </span>
                <span>
                    <CardMenuHome
                        title="Administra????o"
                        icon="wpf:administrator"
                        quant={adms.length}
                        handle={() => setSelectedTable("ADM")}
                        active={activeMenu.adm}
                    />
                </span>
                <span>
                    <CardMenuHome
                        title="Pacientes"
                        icon="fluent:doctor-48-filled"
                        quant={patients.length}
                        handle={() => setSelectedTable("PATIENT")}
                        active={activeMenu.patient}
                    />
                </span>
            </section>
            <section id="table">{switchTable()}</section>
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
        populateAdms(adms) {
            const action = setAdms(adms);
            dispatch(action);
        },
    };
};

const mapStateToProps = (states) => {
    return {
        doctors: states.doctors,
        nurses: states.nurses,
        adms: states.adms,
        patients: states.patients,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
