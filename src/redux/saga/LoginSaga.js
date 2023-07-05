import * as ActionType from "../action/index";
import CommonUtility from "../../utility/constant/CommonUtility";
import { takeLatest, call, put } from "redux-saga/effects";
import * as loginAction from "../action/LoginAction";
//import { loginFailure } from "../action/LoginAction";
import ApiConstant from "../../utility/constant/ApiConstants";
import { postRequest } from "../webservice/webServiceCall";

function* loginModule(data) {
  try {
    const loginData = yield call(
      postRequest,
      CommonUtility.getInstance().CC_BURL_WSURL(
        ApiConstant.BASE_URL_DEV,
        ApiConstant.LOGIN
      ),
      data.payload.obj
    );
    yield put(loginAction.loginSuccess(loginData));
    data.onSuccess(loginData);
  } catch (error) {
    yield put(loginAction.loginFailure());
    data.onFailure(error);
  }
}

export default function* loginSaga() {
  yield takeLatest(ActionType.LOGIN_USER_REQUEST, loginModule);
}
