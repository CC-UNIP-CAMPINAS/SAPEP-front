import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from "../pages/Login";

const AppRoutes = () => {
    // function routesAuth() {
    //     if (props.user.auth) {
    //         return [
    //             <Route path="/profile" key="/profile" component={Profile} />,
    //             <Route key="/" component={MainPage} />,
    //         ];
    //     } else {
    //         return <Redirect to="/login"></Redirect>;
    //     }
    // }

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={Login} />
                {/* {routesAuth()} */}
                <Route path="*">
                    <Redirect to="/login" />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default AppRoutes;
