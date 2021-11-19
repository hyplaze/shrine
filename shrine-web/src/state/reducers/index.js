import {combineReducers} from "redux";
import credentialReducer from "./credentialReducer";

const appReducer = combineReducers({
    credential: credentialReducer,
});

const rootReducer = (state, action) => {
    // need to change if turns to redux-persist
    // https://stackoverflow.com/a/35641992
    if (action.type === 'USER_LOGOUT') {
        return appReducer(undefined, action)
    }
    return appReducer(state, action)
};

export default rootReducer;