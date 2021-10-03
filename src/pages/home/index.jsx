import CardMenuHome from "../../components/CardMenuHome";
import Table from "../../components/Table";
import "./styles.scoped.scss";

function Home() {
    return (
        <div className="container">
            <section id="cards">
                <span>
                    <CardMenuHome title="Médicos" icon="vaadin:doctor" quant={100} active />
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
            <section id="table">
                <Table />
            </section>
        </div>
    );
}

export default Home;
