import { useState } from "react";

const axios = require('axios'); //this is for axios intelisense


function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();

    const response = await axios({
      method: 'post',
      url: 'http://localhost:3000/login',
      data:{
        Email:email,
        mph: "ajdfhalhe" //later implemented
      }
    });

    const resData = response.data; //all the response data
    const resStatus = Boolean(resData.Status); //response status
    const resCookie = resData.cookie; //response cookie

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
