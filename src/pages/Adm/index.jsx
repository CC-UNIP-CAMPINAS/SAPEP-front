import React from "react";
import TablePatient from "../../components/TablePatient";
import "./styles.scoped.scss";

function Adm() {
    React.useEffect(() => (document.title = "SAPEP - Home"), []);

    return (
        <div className="container">
            <section id="table">
                <TablePatient />
            </section>
        </div>
    );
}

export default Adm;
