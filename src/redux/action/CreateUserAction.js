import * as Actions from "./index";
// init createUser
export function createUserRequest(obj, onSuccess, onFailure) {
  return {
    type: Actions.REGISTER_USER_REQUEST,
    payload: {
      obj,
    },
    onSuccess,
    onFailure,
  };
}

// createUser success
export function createUserSuccess(userData, onSuccess, onFailure) {
  return {
    type: Actions.REGISTER_USER_SUCCESS,
    payload: {
      userData,
    },
    onSuccess,
    onFailure,
  };
}

// createUser fail
export function createUserFailure(userData, onSuccess, onFailure) {
  return {
    type: Actions.REGISTER_USER_FAILURE,
    payload: {
      userData,
    },
    onSuccess,
    onFailure,
  };
}
