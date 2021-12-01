import React, { Component } from "react";
import logo from "../../Assets/logo.png";
import "../../index.css";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: props.page,
      logoutHandler: props.logoutHandler,
    };
  }
  render = () => {
    let home = this.state.page === "HomePage" ? "nav-link active" : "nav-link"
    let generator = this.state.page === "GeneratorPage" ? "nav-link active" : "nav-link"
    let checker = this.state.page === "CheckerPage" ? "nav-link active" : "nav-link"

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
                <a class={home} aria-current="page" href="/home">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class={generator} href="/generator">
                  Generator
                </a>
              </li>
              <li class="nav-item">
                <a class={checker} href="/checker">
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
                <ul class="dropdown-menu">
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
                        this.state.logoutHandler(
                          localStorage.getItem("cookie")
                        );
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

export default NavBar;
