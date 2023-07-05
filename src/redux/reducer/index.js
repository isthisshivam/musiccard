import { combineReducers } from "redux";
import loginReducer from "./LoginReducer";
import createUserReducer from "./CreateUserReducer";
import forgotPasswordReducer from "./ForgotPasswordReducer";
import loggedInUserReducer from "./LoggedInUserReducer";
import * as ActionType from "../action/index";
import AsyncStorage from "@react-native-community/async-storage";

// root reducer
const appReducer = combineReducers({
  loginReducer: loginReducer,
  createUserReducer: createUserReducer,
  forgotPasswordReducer: forgotPasswordReducer,
  loggedInUserReducer: loggedInUserReducer,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === ActionType.LOGOUT_USER_REQUEST) {
    AsyncStorage.removeItem("persist:root");
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
