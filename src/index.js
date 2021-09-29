import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import "./global.scss";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/routes";

ReactDOM.render(
    <React.StrictMode>
        <AppRoutes />
        <ToastContainer autoClose={3000} theme="colored" />
    </React.StrictMode>,
    document.getElementById("root")
);
