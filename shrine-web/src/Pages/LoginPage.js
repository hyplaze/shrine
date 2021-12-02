import { useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "./../Assets/logo.png";
import { genCredential } from "../crypto/credential";

import axios from "../axios/axiosConfig";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

  async function loginUser(event) {
    event.preventDefault();
    const credential = await genCredential(email, password);
    const stretchedMasterKey = credential[0];
    const mph = credential[1];
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
    localStorage.setItem("email", email);
    if (resStatus) {
      window.location.href = "/home";
      setShowPassword(false);
    } else {
      setPassword("");
      setShowPassword(false);
      alert("Please check your username and password");
    }
  }

  const handleShowPassword = (e) => {
    setShowPassword(!showPassword);
  };

  return (
    <div class="container-fluid vh-100">
      <div class="row justify-content-center align-items-center h-100">
        <div class="col-3">
          <img src={logo} alt="logo" class="img-fluid d-flex" />
        </div>
        <div class="col-3 mx-3">
          <h1>Log In</h1>
          <div class="row mt-3">
            <form
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  loginUser(event);
                }
              }}
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
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Password
                </label>
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
              <div
                class="btn-group"
                role="group"
                aria-label="Basic outlined example"
              >
                <button
                  type="botton"
                  class="btn btn-outline-primary"
                  onClick={loginUser}
                >
                  Log In
                </button>
              </div>
            </form>
          </div>

          <button
            type="button"
            class="btn btn-outline-primary"
            onClick={() => {
              history.push("/register");
              history.go();
              setShowPassword(false);
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
