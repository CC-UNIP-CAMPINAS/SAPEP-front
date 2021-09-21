import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Adm } from "../pages/Adm/Adm";
import Login from "../pages/Login/Login";
import { connect } from "react-redux";

const AppRoutes = (props) => {
    function routesAuth() {
        if (props.user.auth) {
            return [<Route path="/" key="/profile" component={Adm} />];
        } else {
            return <Redirect to="/login"></Redirect>;
        }
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={Login} />
                {routesAuth()}
                <Route path="*">
                    <Redirect to="/login"></Redirect>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

const mapStateToProps = (states) => {
    return {
        user: states.user,
    };
};

export default connect(mapStateToProps, null)(AppRoutes);
