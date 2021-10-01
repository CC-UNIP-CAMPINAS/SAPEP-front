import CardMenuHome from "../../components/CardMenuHome";
import "./styles.scoped.scss";

function Home() {
    return (
        <div className="container">
            <section id="cards">
                <span>
                    <CardMenuHome title="Médicos" icon="vaadin:doctor" quant={100} />
                </span>
                <span>
                    <CardMenuHome title="Enfermeiros" icon="wpf:medical-doctor" quant={100} />
                </span>
                <span>
                    <CardMenuHome title="Pacientes" icon="fluent:doctor-48-filled" quant={100} />
                </span>
            </section>
            <section id="graph">
                <h1>Oi</h1>
            </section>
        </div>
    );
}

export default Home;
