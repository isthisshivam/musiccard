import { LOGGED_IN_USER_DETAILS } from "../action/actions";
export const loggedInUserReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGGED_IN_USER_DETAILS: {
      return {
        ...state,
        userData: {
          ...action.payload,
        },
      };
    }

    default: {
      return state;
    }
  }
};
