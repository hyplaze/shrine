import { useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "./../Assets/logo.png";
import { genCredential } from "../crypto/credential";

//const axios = require("axios"); //this is for axios intellisense
import axios from "../axios/axiosConfig";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function loginUser(event) {
    event.preventDefault();
    const credential = await genCredential(email, password);
    const stretchedMasterKey = credential[0];
    const mph = credential[1];
    console.log("Email", email);
    console.log("Password", password);
    console.log("smk:", stretchedMasterKey);
    console.log("mph", mph);
    const response = await axios({
      method: "post",
      url: "/login",
      data: {
        Email: email,
        mph: mph,
      },
    });

    const resData = response.data; //all the response data
    const resStatus = Boolean(resData.Status); //response status
    const resCookie = resData.cookie; //response cookie
    localStorage.setItem("cookie", resCookie);
    localStorage.setItem("stretchedMasterKey", stretchedMasterKey);
    if (resStatus) {
      // localStorage.setItem("token", data.user); local storage, this is Hanry's stuff
      console.log("Login successful");
      window.location.href = "/home";
    } else {
      alert("Please check your username and password");
    }
  }

  return (
    <div class="container-fluid vh-100">
      <div class="row justify-content-center align-items-center h-100">
        <div class="col-3">
          <img src={logo} class="img-fluid d-flex" />
        </div>
        <div class="col-3 mx-3">
          <h1>Log In</h1>
          <div class="row mt-3">
            <form onSubmit={loginUser}>
              <div class>
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
              </div>
              <div class>
                <label class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  class="form-control"
                />
              </div>
              <div class="d-flex justify-content-between mt-3">
                <div
                  class="btn-group"
                  role="group"
                >
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    onClick={() => {
                      history.push("/register");
                      history.go();
                    }}
                  >
                    Not Registered? Sign Up
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    onClick={() => {
                      history.push("/");
                      history.go();
                    }}
                  >
                    Go back
                  </button>
                </div>
                <button type="submit" class="btn btn-primary">
                    Log In
                  </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
