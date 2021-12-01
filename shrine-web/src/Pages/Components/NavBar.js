import React, { Component } from "react";
import logo from "../../Assets/logo.png";
import "../../index.css";
import axios from "../../axios/axiosConfig";
import {withRouter} from "react-router-dom"

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: props.page,
      logoutHandler: props.logoutHandler,
    };

    this.logoutHandler = this.logoutHandler.bind(this);
  }

  async logoutHandler(){
    const response = await axios({
      method: "post",
      url: "/logout",
      data: {
        cookie: localStorage.getItem("cookie"),
      },
    });
    if (response.data.Status === true) {
      localStorage.clear();
      this.props.history.push("/");
      this.props.history.go();
    }
  }
  render() {
    let style1, style2;
    if (this.state.page === "HomePage") {
      style1 = "nav-link active";
      style2 = "nav-link";
    } else {
      style1 = "nav-link";
      style2 = "nav-link active";
    }

    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <div class="navbar-brand">
            <img
              src={logo}
              alt=""
              width="30"
              height="24"
              class="d-inline-block align-text-top"
            />
            {"  Shrine"}
          </div>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class={style1} aria-current="page" href="/home">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class={style2} href="/generator">
                  Generator
                </a>
              </li>
              <li class="nav-item">
                <a class={style2} href="/checker">
                  Password-Pwned?
                </a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="/#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Account
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <p class="dropdown-item">Hanry</p>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      class="dropdown-item"
                      onClick={() => {
                        this.logoutHandler();
                      }}
                    >
                      Log out
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(NavBar);
