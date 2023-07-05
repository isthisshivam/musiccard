import * as ActionType from "../action/index";
import CommonUtility from "../../utility/constant/CommonUtility";
import { takeLatest, call, put } from "redux-saga/effects";
import * as loggedInUserAction from "../action/LoggedInUserAction";
import ApiConstant from "../../utility/constant/ApiConstants";
import { getRequest } from "../webservice/webServiceCall";

function* loggedInUserModule(data) {
  try {
    const loginData = yield call(
      getRequest,
      CommonUtility.getInstance().CC_BURL_WSURL(
        ApiConstant.BASE_URL_DEV,
        ApiConstant.LOGGED_IN_USER
      ),
      data.payload.obj
    );
    yield put(loggedInUserAction.loggedInUserSuccess(loginData));
    data.onSuccess(loginData);
  } catch (error) {
    yield put(loggedInUserAction.loggedInUserFailure());
    data.onFailure(error);
  }
}

export default function* loggedInUserSaga() {
  yield takeLatest(ActionType.LOGGED_IN_USER_REQUEST, loggedInUserModule);
}
