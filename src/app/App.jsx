import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import Routes from "../routes/routes";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <>
            <Routes />
            <ToastContainer autoClose={3000} theme="colored" />
        </>
    );
}

export default App;
