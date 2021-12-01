import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ReactDom from "react-dom";
import "jquery";
import "popper.js";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import HomePage from "./Pages/HomePage";
import MainPage from "./Pages/MainPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import GeneratorPage from "./Pages/GeneratorPage";
import NotFoundPage from "./Pages/NotFoundPage";
import CheckerPage from "./Pages/CheckerPage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/generator" component={GeneratorPage} />
          <Route path="/checker" component={CheckerPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDom.render(<App />, document.getElementById("root"));
