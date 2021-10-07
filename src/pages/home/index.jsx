import CardMenuHome from "../../components/CardMenuHome";
import TableDoctor from "../../components/TableDoctor";
import "./styles.scoped.scss";
import React from "react";
import { api } from "../../services/api";
import { setDoctors } from "../../store/actions/doctor.action";
import { connect } from "react-redux";
import { notification } from "../../services/toastify";
import types from "../../services/types";
import Button from "../../components/Button/Button";
import CardAddDoctor from "../../components/CardAddDoctor";
import Popup from "reactjs-popup";

function Home({ populateDoctors, doctors }) {
    const [isCheck, setIsCheck] = React.useState(true);
    const modalRef = React.useRef();
    const openModal = () => modalRef.current.open();
    const closeModal = () => modalRef.current.close();

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

    function handleShowDoctor() {
        if (!isCheck) {
            return doctors;
        } else {
            return doctors.filter((doctor) => doctor.active);
        }
    }

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
                <span>
                    <Button text="Adicionar médico" color="cyan" handle={openModal} />
                </span>
                <div />
                <p>Somente médicos ativos</p>
                <input type="checkbox" checked={isCheck} onChange={() => setIsCheck(!isCheck)} />
                <Popup ref={modalRef} modal>
                    <CardAddDoctor close={closeModal} />
                </Popup>
            </section>
            <section id="table">
                <TableDoctor header={["Id", "Nome", "Email", "CRM", "Área", "Sexo", "Telefone"]} doctors={handleShowDoctor()} />
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
