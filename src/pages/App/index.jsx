import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Adm from "../Adm";
import Doctor from "../Doctor";
import Home from "../home/index";
import "./styles.scoped.scss";

function App({ user }) {
    function handleRoutes() {
        switch (user.groupId) {
            case 3:
                return [<Route key="/" component={Adm} />];
            case 1:
                return [<Route key="/" component={Doctor} />];
            default:
                return [<Route key="/" component={Home} />];
        }
    }

    return (
        <div className="container">
            <NavBar />
            <Switch>
                {handleRoutes()}
                <Route path="*">
                    <Redirect to="/login" />
                </Route>
            </Switch>
        </div>
    );
}

const mapStateToProps = (states) => {
    return {
        user: states.user,
    };
};

export default connect(
    mapStateToProps,
    null
)(App);
