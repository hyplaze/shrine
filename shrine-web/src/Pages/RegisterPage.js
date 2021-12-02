import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../axios/axiosConfig";

import logo from "./../Assets/logo.png";
import { genCredential } from "../crypto/credential";

function RegisterPage() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function registerUser(event) {
    event.preventDefault();
    if (email === "" || password === "") {
      setPassword("");
      setShowPassword(false);
      alert("Please enter your email and password");
      return;
    }
    const credential = await genCredential(email, password);
    const stretchedMasterKey = credential[0];
    const mph = credential[1];
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

    if (resStatus) {
      history.push("/login");
      setShowPassword(false);
    } else {
      setPassword("");
      setShowPassword(false);
      alert("User already exist.");
    }
  }

  const handleShowPassword = (e) => {
    setShowPassword(!showPassword);
  };

  return (
    <div class="container-fluid vh-100">
      <div class="row justify-content-center h-100 align-items-center">
        <div class="col-4">
          <div class="row justify-content-center">
            <img src={logo} class="h-25 w-25" />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
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
              <label class="form-label">Password</label>
              <div class="input-group mb-3">
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  class="form-control"
                  id="exampleInputPassword1"
                  value={password}
                />
                <button
                  class="btn btn-outline-primary"
                  onClick={handleShowPassword}
                >
                  {showPassword ? "hide" : "show"}
                </button>
              </div>
            </div>

            <div class="justify-content-between d-flex">
              <div class="btn-group" role="group">
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
                    setShowPassword(false);
                  }}
                >
                  About
                </button>
              </div>
              <button
                type="botton"
                class="btn btn-outline-primary"
                onClick={registerUser}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
