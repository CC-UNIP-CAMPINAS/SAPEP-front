import React from "react";
import NavBar from "../../components/NavBar";

import "./styles.scoped.scss";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "../home/index";
import { Redirect } from "react-router-dom";

function App() {
    return (
        <div className="container">
            <NavBar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="*">
                    <Redirect to="/login" />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
