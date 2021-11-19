import { genCredential } from "../../crypto/credential";

import history from "../../history";

export const setEmail = (email) => {
  return (dispatch) => {
    dispatch({
      type: "SET_EMAIL",
      payload: { email: email },
    });
  };
};

export const generateCredential = (password) => {
  return async (dispatch, getState) => {
    const email = getState().credential.email;
    genCredential(email, password).then((credential_value) => {
      //   console.log("in credentialAction", credential_value);
      dispatch({
        type: "INIT_KEY_AND_HASH",
        payload: {
          stretchedMasterKey: credential_value[0],
          masterPasswordHash: credential_value[1],
        },
      });
      //   console.log(getState().credential.credentialReady);
      //   console.log(
      //     "stretchedMasterKey",
      //     getState().credential.stretchedMasterKey
      //   );
      //   console.log(
      //     "masterPasswordHash",
      // 	getState().credential.masterPasswordHash,
      //   );
      //   console.log("gets executed");
      history.push("/shrine");
      history.go();
    });
  };
};
