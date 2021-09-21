import React from "react";
import logo from "../../assets/img/logo.png";
import { Input } from "../../components/Input/Input";
import { checkbox } from "../../components/Checkbox/Checkbox";
import { button } from "../../components/Button/Button";
import api from "../../services/api";
import { setUser } from "../../store/actions/user.action";
import { connect } from "react-redux";

const Login = (props) => {
  const [inputs, setInputs] = React.useState({ email: "", password: "" });

  async function executeLogin(e) {
    e.preventDefault();
    const { data } = await api.post("/login", { email: inputs.email, password: inputs.password }, { withCredentials: true });
    const user = { email: data.payload.user.email, auth: data.payload.auth };
    props.setUser(user);
    console.log(data);
  }
  return (
    <section>
      <div className="container-login">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-12 col-md-9">
            <img src={logo} alt="logo" className="loginLogo" />
            <div className="card shadow-sm my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="login-form">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Login</h1>
                      </div>
                      <form className="user" onSubmit={(e) => executeLogin(e)}>
                        <Input
                          type="email"
                          id="emailLogin"
                          placeholder="seuemail@gmail.com"
                          value={inputs.email}
                          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                        ></Input>
                        <Input
                          type="password"
                          id="passwordLogin"
                          placeholder="*******"
                          value={inputs.password}
                          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        ></Input>
                        {checkbox("checkboxLogin", "teste")}
                        {button("login", "Entrar", "index.html")}
                      </form>
                      <hr />
                      <div className="text-center">
                        <a className="font-weight-bold small" href="register.html">
                          Create an Account!
                        </a>
                      </div>
                      <div className="text-center"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser(user) {
      const action = setUser(user);
      dispatch(action);
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
