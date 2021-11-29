import { useState } from "react";
import { useHistory } from "react-router-dom";
//const axios = require('axios'); //this is for axios intelisense
import axios from "./../axios/axiosConfig";

import { genCredential } from "../crypto/credential";
function App() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(event) {
    event.preventDefault();
    const credential = await genCredential(email, password);
    const stretchedMasterKey = credential[0];
    const mph = credential[1];
    console.log(stretchedMasterKey);
    console.log(mph);
    const response = await axios({
      method: "post",
      url: "/register",
      data: {
        Email: email,
        mph: mph, //later implemented
      },
    });

    const resData = response.data;
    const resStatus = Boolean(resData.Status);

    console.log(response);

    if (resStatus) {
      history.push("/login");
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />
        <br />
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
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}

export default App;
