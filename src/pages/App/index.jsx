import { Icon } from "@iconify/react";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import ScrollToTop from "react-scroll-up";
import NavBar from "../../components/NavBar";
import { api } from "../../services/api";
import { notification } from "../../services/toastify";
import types from "../../services/types";
import { setPatients } from "../../store/actions/patients.action";
import Adm from "../Adm";
import Doctor from "../Doctor";
import Home from "../home/index";
import Patient from "../Patient";
import "./styles.scoped.scss";

function App({ user, populatePatients }) {
    function handleRoutes() {
        switch (user.groupId) {
            case 3:
                return [<Route key="/" component={Adm} />];
            case 1:
                return [
                    <Route key="/" exact path="/" component={Doctor} />,
                    <Route key="/patient" exact path="/patient/:id" component={Patient} />,
                ];
            default:
                return [<Route key="/" component={Home} />];
        }
    }

    React.useEffect(() => {
        async function loadPatients() {
            try {
                const { data } = await api.get("/patient");
                populatePatients(data);
            } catch (error) {
                console.log(error);
                notification(types.ERROR, error.message);
            }
        }

        loadPatients();
    }, [populatePatients]);

    return (
        <div className="container">
            <NavBar />
            <Switch>
                {handleRoutes()}
                <Route path="*">
                    <Redirect to="/login" />
                </Route>
            </Switch>
            <ScrollToTop showUnder={160} duration={600} className="testando">
                <Icon icon="akar-icons:circle-chevron-up-fill" id="button-up-page" />
            </ScrollToTop>
        </div>
    );
}

const mapStateToProps = (states) => {
    return {
        user: states.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        populatePatients(patients) {
            const action = setPatients(patients);
            dispatch(action);
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
