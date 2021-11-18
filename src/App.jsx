import { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import "jquery"
import "popper.js"
import "./index.css"
import "bootstrap/dist/js/bootstrap"
import "bootstrap/dist/css/bootstrap.css"

import HomePage from "./Pages/HomePage.jsx";
import MainPage from "./Pages/MainPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import GeneraterPage from "./Pages/GeneratorPage.jsx";

class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/generator" element={<GeneraterPage />} />
                </Routes>
            </Router>
        )
    }
}

export default App