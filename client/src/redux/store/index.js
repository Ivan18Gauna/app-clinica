import {createStore, applyMiddleware, compose} from "redux";
import {composeWithDevTools} from "redux-devtools-extension"
import  thunkMiddleware  from "redux-thunk";
import rootReducer from "../reducer/index";


//const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;