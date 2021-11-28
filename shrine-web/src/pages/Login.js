// import axios from "axios";
import { useState } from "react";

const axios = require('axios'); //this is for axios intelisense


function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();

    // console.log("Im here")
    // const resData = axios({
    //   method: 'post',
    //   url: 'http://localhost:3000/login',
    //   Email:"getBack@Beatles.edu",
    //   mph: "2342313"
    // })
    // .then(res => { 
    //   console.log(res);
    //   return res.data;});

    // console.log(resData)
    const response = await axios({
      method: 'post',
      url: 'http://localhost:3000/login',
      Email:"getBack@Beatles.edu",
      mph: "2342313"
    });

    const resData = response.data; //all the response data
    const resStatus = resData.Status; //response status
    const resCookie = resData.cookie; //response cookie

    //check true,
    //store user name,
    //store cookie
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
