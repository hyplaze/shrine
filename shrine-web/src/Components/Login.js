import React from "react";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../state";

const Login = () => {
  const credential = useSelector((state) => state.credential);
  const dispatch = useDispatch();

  const { setEmail, generateCredential } = bindActionCreators(
    actionCreators,
    dispatch
  );

  return (
    <div className={"App"}>
      <h1>Login</h1>
      <form>
        <label>
          Email:
          <input type="text" name="email" />
        </label>
        <label>
          Password:
          <input type={"password"} name="password" />
        </label>
        <input
          type="submit"
          value="Submit"
          onClick={(e) => {
            e.preventDefault();
            const email = document.getElementsByName("email")[0].value;
            const password = document.getElementsByName("password")[0].value;
            setEmail(email);
            generateCredential(password);
          }}
        />
      </form>
      <p>Email: {credential.email}</p>
      {/* <p>Encrypted Email: {encrypted_email}</p>
      <p>Decrypted Email: {decrypted_email}</p> */}
      {/*<p>stretchedMasterKey: {credential.stretchedMasterKey}</p>*/}
      {/*<p>masterPasswordHash: {credential.masterPasswordHash}</p>*/}
    </div>
  );
};

export default Login;
