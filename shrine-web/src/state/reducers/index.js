import {combineReducers} from "redux";
import credentialReducer from "./credentialReducer";

const reducers = combineReducers({
    credential: credentialReducer
});

export default reducers;