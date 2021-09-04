import React from "react";
import logo from "../../Assets/imagens/logo.png";
import { input } from "../../components/input";
import { checkbox } from "../../components/checkbox";
import { button } from "../../components/button";

export function Login() {
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
                      <form className="user">
                        {input("email", "emailLogin", "seuemail@gmail.com")}
                        {input("password", "passwordLogin", "*******")}
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
}
