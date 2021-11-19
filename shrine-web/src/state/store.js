import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk"
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducers from "./reducers/index"

const persistConfig = {
    key: 'authType',
    storage: storage,
    blacklist: [''],
};
const pReducer = persistReducer(persistConfig, rootReducers);

const middleware = applyMiddleware(thunk);
const store = createStore(pReducer, middleware);

const persistor = persistStore(store);

export {persistor, store};