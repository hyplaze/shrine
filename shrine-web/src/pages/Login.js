import { useState } from "react";
import { genCredential } from "../crypto/credential";

//const axios = require("axios"); //this is for axios intelisense
import axios from "./../axios/axiosConfig";
function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();
    const credential = await genCredential(email, password);
    const stretchedMasterKey = credential[0];
    const mph = credential[1];
    console.log(stretchedMasterKey);
    console.log(mph);
    const response = await axios({
      method: "post",
      url: "/login",
      data: {
        Email: email,
        mph: mph, //later implemented
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
      window.location.href = "/dashboard";
    } else {
      alert("Please check your username and password");
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default App;
