import './App.css';
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "./state/index";

function App() {
    const state = useSelector((state) => state.credential);

    const dispatch = useDispatch();

    const {setEmail, generateCredential} = bindActionCreators(actionCreators, dispatch);

    return (
        <div className={"App"}>
            <h1>Login</h1>
            <form>
                <label>
                    Email:
                    <input type="text" name="email"/>
                </label>
                <label>
                    Password:
                    <input type={'password'} name="password"/>
                </label>
                <input type="submit" value="Submit" onClick={(e) => {
                    e.preventDefault();
                    const email = document.getElementsByName('email')[0].value;
                    const password = document.getElementsByName('password')[0].value;
                    setEmail(email);
                    generateCredential(state.email, password);
                    // console.log("123", state.email, state.stretchedMasterKey, state.masterPasswordHash)
                }}/>
            </form>
            <p>Email: {state.email}</p>
            <p>stretchedMasterKey: {state.stretchedMasterKey}</p>
            <p>masterPasswordHash: {state.masterPasswordHash}</p>
        </div>
    );
}

export default App;
