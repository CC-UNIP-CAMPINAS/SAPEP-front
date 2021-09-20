import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Login } from "../pages/Login/Login";

const AppRoutes = (props) => {
  //   function routesAuth() {
  //     if (props.user.auth) {
  //       return [<Route path="/profile" key="/profile" component={Profile} />, <Route key="/" component={MainPage} />];
  //     } else {
  //       return <Redirect to="/login"></Redirect>;
  //     }
  //   }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        {/* routesAuth() */}
        <Route path="*">
          <Redirect to="/login"></Redirect>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default AppRoutes;
