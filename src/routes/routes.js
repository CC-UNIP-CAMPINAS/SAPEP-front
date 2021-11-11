import { connect } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import App from "../pages/App";
import ConfirmationEmail from "../pages/ConfirmationEmail";
import Login from "../pages/Login";

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
                <Route exact path="/change-email/:id" component={ConfirmationEmail} />
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
