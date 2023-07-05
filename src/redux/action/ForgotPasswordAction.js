import * as Actions from "./index";
// init forgotPassword
export function forgotPasswordRequest(obj, onSuccess, onFailure) {
  return {
    type: Actions.FORGOT_PASSWORD_REQUEST,
    payload: {
      obj,
    },
    onSuccess,
    onFailure,
  };
}

// forgotPassword success
export function forgotPasswordSuccess(userData, onSuccess, onFailure) {
  return {
    type: Actions.FORGOT_PASSWORD_SUCCESS,
    payload: {
      userData,
    },
    onSuccess,
    onFailure,
  };
}

// forgotPassword fail
export function forgotPasswordFailure(userData, onSuccess, onFailure) {
  return {
    type: Actions.FORGOT_PASSWORD_FAILURE,
    payload: {
      userData,
    },
    onSuccess,
    onFailure,
  };
}
