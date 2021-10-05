import React from "react";

import "./styles.scoped.scss";
import Button from "../Button/Button/index";

function ModalDoctorInformation({ doctor }) {
    const [disabled, setDisabled] = React.useState(true);

    const initialState = {
        email: doctor.user.email,
        crm: doctor.crm,
        name: doctor.user.name,
        phone: doctor.user.phone,
        area: doctor.area,
        gender: doctor.user.gender,
    };

    const [inputs, setInputs] = React.useState({
        ...initialState,
    });

    function clear() {
        setInputs(initialState);
        setDisabled(true);
    }

    function handleEditInputs() {
        const element = document.getElementById("container-doctor");
        if (element) element.scrollTo({ top: 0, behavior: "smooth" });

        disabled ? setDisabled(false) : setDisabled(true);
    }

    return (
        <div className="container" id="container-doctor">
            <h1>Dados do médico</h1>
            <label>ID: </label>
            <input value={doctor.userId} disabled={true} />
            <label>Nome: </label>
            <input
                value={inputs.name}
                disabled={disabled}
                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            />
            <label>Email: </label>
            <input
                value={inputs.email}
                disabled={disabled}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
            <label>CRM: </label>
            <input
                value={inputs.crm}
                disabled={disabled}
                onChange={(e) => setInputs({ ...inputs, crm: e.target.value })}
            />
            <label>Área: </label>
            <input
                value={inputs.area}
                disabled={disabled}
                onChange={(e) => setInputs({ ...inputs, area: e.target.value })}
            />

            <label>Gênero: </label>
            <select
                name="gender"
                disabled={disabled}
                value={inputs.gender}
                onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
            >
                <option value="INDEFINIDO">Indefinido</option>
                <option value="F">Feminino</option>
                <option value="M">Masculino</option>
            </select>
            <label>Telefone: </label>
            <input
                value={inputs.phone}
                disabled={disabled}
                onChange={(e) => setInputs({ ...inputs, phone: e.target.value })}
            />

            <div>
                <Button text="Mudar dados" color="cyan" handle={handleEditInputs} />
                <span />
                {!disabled ? (
                    <Button text="Cancelar" color="red" handle={clear} />
                ) : (
                    <Button text="Excluir" color="red" />
                )}
            </div>
        </div>
    );
}

export default ModalDoctorInformation;
