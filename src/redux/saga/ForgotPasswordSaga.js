import * as ActionType from "../action/index";
import CommonUtility from "../../utility/constant/CommonUtility";
import { takeLatest, call, put, takeEvery } from "redux-saga/effects";
import * as forgotPasswordAction from "../action/ForgotPasswordAction";
import ApiConstant from "../../utility/constant/ApiConstants";
import { patchRequest, postRequest } from "../webservice/webServiceCall";

function* forgotPasswordModule(data) {
  try {
    const userData = yield call(
      patchRequest,
      CommonUtility.getInstance().CC_BURL_WSURL(
        ApiConstant.BASE_URL_DEV,
        ApiConstant.FORGOT_PASSWORD
      ),
      data.payload.obj
    );
    yield put(forgotPasswordAction.forgotPasswordRequest(userData));
    data.onSuccess(userData);
  } catch (error) {
    yield put(forgotPasswordAction.forgotPasswordFailure());
    data.onFailure(error);
  }
}

export default function* forgotPasswordSaga() {
  yield takeLatest(ActionType.FORGOT_PASSWORD_REQUEST, forgotPasswordModule);
}
