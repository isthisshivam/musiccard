import * as ActionType from "../action/index";
import CommonUtility from "../../utility/constant/CommonUtility";
import { takeLatest, call, put } from "redux-saga/effects";
import * as createUserAction from "../action/CreateUserAction";
import ApiConstant from "../../utility/constant/ApiConstants";
import { postRequest } from "../webservice/webServiceCall";

function* createUserModule(data) {
  try {
    const userData = yield call(
      postRequest,
      CommonUtility.getInstance().CC_BURL_WSURL(
        ApiConstant.BASE_URL_DEV,
        ApiConstant.CREATE_USER
      ),
      data.payload.obj
    );
    yield put(createUserAction.createUserSuccess(userData));
    data.onSuccess(userData);
  } catch (error) {
    yield put(createUserAction.createUserFailure());
    data.onFailure(error);
  }
}

export default function* createUserSaga() {
  yield takeLatest(ActionType.REGISTER_USER_REQUEST, createUserModule);
}
