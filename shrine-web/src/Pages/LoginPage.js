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
  const [showPassword, setShowPassword] = useState(true);

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
      setTimeout(function() {
        setShowPassword(true);
      }, 3000);
    } else {
      setPassword("")
      setShowPassword(true);
      alert("Please check your username and password");
    }
  }

  const handleShowPassword = (e) =>{
    setShowPassword(!showPassword);
  }



  return (
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-4 h100" style={{ paddingTop: "15%" }}>
          <div class="row justify-content-center">
            <img src={logo} class="h-25 w-25" alt="Responsive" />
          </div>
          <form onSubmit={loginUser}>
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
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                class="form-control"
                id="exampleInputPassword1"
                value={password}
                onClick={handleShowPassword}
              />
            </div>
            <div
              class="btn-group"
              role="group"
              aria-label="Basic outlined example"
            >
              <button type="submit" class="btn btn-outline-primary">
                Log In
              </button>
            </div>
          </form>
          <button
            type="button"
            class="btn btn-outline-primary"
            onClick={() => {
              history.push("/register");
              history.go();
              setShowPassword(true);
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
            About
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
