import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import "./global.scss";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/routes";
import configStore from "./store/store";
import { Provider } from "react-redux";

const store = configStore();

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <AppRoutes />
            <ToastContainer autoClose={3000} theme="colored" />
        </React.StrictMode>
    </Provider>,
    document.getElementById("root")
);
