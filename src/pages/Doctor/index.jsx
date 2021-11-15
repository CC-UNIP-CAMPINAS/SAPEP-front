import React from "react";
import CardDoctorInformation from "../../components/CardDoctorInformation";
import TablePatient from "../../components/TablePatient";
import "./styles.scoped.scss";

function Nurse() {
    React.useEffect(() => (document.title = "SAPEP - Home"), []);

    return (
        <div className="container">
            <section id="information">
                <CardDoctorInformation />
            </section>
            <section id="table">
                <TablePatient />
            </section>
        </div>
    );
}

export default Nurse;
