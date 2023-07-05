import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { loginReducer } from "../../reduxThunk/reducer/loginReducer";
import { loggedInUserReducer } from "../../reduxThunk/reducer/loggedInUserReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {};
const store = createStore(
  combineReducers({
    loginReducer: loginReducer,
    loggedInUserReducer: loggedInUserReducer,
  }),
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
