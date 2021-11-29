import { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ReactDom from "react-dom";
import React from "react";
import "jquery"
import "popper.js"
import "bootstrap/dist/js/bootstrap"
import "bootstrap/dist/css/bootstrap.css"

import HomePage from "./Pages/HomePage.jsx";
import MainPage from "./Pages/MainPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import GeneraterPage from "./Pages/GeneratorPage.jsx";
import CheckorPage from "./Pages/CheckerPage.jsx"

class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/generator" element={<GeneraterPage />} />
                    <Route path="/checker" element={<CheckorPage />} />
                </Routes>
            </Router>
        )
    }
}

ReactDom.render(<App />, document.getElementById("root"))