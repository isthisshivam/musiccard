import * as Actions from "./index";

// init loggedInUser
export function loggedInUserRequest(obj, onSuccess, onFailure) {
  return {
    type: Actions.LOGGED_IN_USER_REQUEST,
    payload: {
      obj,
    },
    onSuccess,
    onFailure,
  };
}

// loggedInUser success
export function loggedInUserSuccess(userData, onSuccess, onFailure) {
  return {
    type: Actions.LOGGED_IN_USER_SUCCESS,
    payload: {
      userData,
    },
    onSuccess,
    onFailure,
  };
}

// loggedInUser fail
export function loggedInUserFailure(userData, onSuccess, onFailure) {
  return {
    type: Actions.LOGGED_IN_USER_FAILURE,
    payload: {
      userData,
    },
    onSuccess,
    onFailure,
  };
}
