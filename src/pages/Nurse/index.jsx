import React from "react";
import CardNurseInformation from "../../components/CardNurseInformation";
import TablePatient from "../../components/TablePatient";
import "./styles.scoped.scss";

function Nurse() {
    React.useEffect(() => (document.title = "SAPEP - Home"), []);

    return (
        <div className="container">
            <section id="information">
                <CardNurseInformation />
            </section>
            <section id="table">
                <TablePatient />
            </section>
        </div>
    );
}

export default Nurse;
