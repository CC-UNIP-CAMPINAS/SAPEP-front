import { connect } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from "../pages/Login";
import App from "../pages/App";

const AppRoutes = ({ user }) => {
    function routesAuth() {
        if (user.auth) {
            return [<Route key="/" component={App} />];
        } else {
            return <Redirect to="/login" />;
        }
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={Login} />
                {routesAuth()}
                <Route path="*">
                    <Redirect to="/login" />
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

export default connect(
    mapStateToProps,
    null
)(AppRoutes);
