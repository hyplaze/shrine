import { useState } from "react";
import { useHistory } from "react-router-dom";
//const axios = require('axios'); //this is for axios intellisense
import axios from "../axios/axiosConfig";

import logo from "./../Assets/logo.png";
import { genCredential } from "../crypto/credential";

function RegisterPage() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(event) {
    event.preventDefault();
    if (email === "" || password === "") {
      alert("Please enter your email and password");
      return;
    }
    const credential = await genCredential(email, password);
    const stretchedMasterKey = credential[0];
    const mph = credential[1];
    console.log("smk:", stretchedMasterKey);
    console.log("mph:", mph);
    const response = await axios({
      method: "post",
      url: "/register",
      data: {
        Email: email,
        mph: mph,
      },
    });

    const resData = response.data;
    const resStatus = Boolean(resData.Status);

    console.log(response);

    if (resStatus) {
      history.push("/login");
    } else {
      alert("User already exist.");
    }
  }

  return (
    <div class="container-fluid vh-100">
      <div class="row justify-content-center h-100 align-items-center">
        <div class="col-4">
          <div class="row justify-content-center">
            <img src={logo} class="h-25 w-25" />
          </div>
          <form onSubmit={registerUser}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email
              </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" class="form-text">
                We won't share the information with anyone.
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">
                Password
              </label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                class="form-control"
              />
            </div>
            <div class="justify-content-between d-flex">
              <div
                class="btn-group"
                role="group"
              >
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  onClick={() => {
                    history.push("/login");
                    history.go();
                  }}
                >
                  Registered? Log In
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  onClick={() => {
                    history.push("/");
                    history.go();
                  }}
                >
                  About
                </button>
              </div>
              <button type="submit" class="btn btn-primary">
                {"⠀Sign Up⠀"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
