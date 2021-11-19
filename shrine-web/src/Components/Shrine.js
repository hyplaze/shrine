import React from "react";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../state";

export default function Signup() {
  //   console.log("Get to signup");
  const credential = useSelector((state) => state.credential);
  //   console.log("credential: ", credential.credentialReady);
  //   console.log("stretchedMasterKey", credential.stretchedMasterKey);
  //   console.log("masterPasswordHash", credential.masterPasswordHash);
  if (credential.credentialReady) {
    return (
      <div>
        <h1>{credential.email}</h1>
      </div>
    );
  } else
    return (
      <div>
        <h1>Nothing</h1>
        <h2>{credential.email}</h2>
      </div>
    );
}
