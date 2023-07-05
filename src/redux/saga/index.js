import loginSaga from "./LoginSaga";
import createUserSaga from "./CreateUserSaga";
import forgotPasswordSaga from "./ForgotPasswordSaga";
import loggedInUserSaga from "./LoggedInUserSaga";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([
    loginSaga(),
    createUserSaga(),
    forgotPasswordSaga(),
    loggedInUserSaga(),
  ]);
}
