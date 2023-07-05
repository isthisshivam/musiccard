import { LOGIN_SUCCESS } from "../action/actions";
export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        userData: {
          ...action.payload,
        },
      };
    }
    case "onLogout": {
      return {
        ...state,
        userData: null,
      };
    }
    default: {
      return state;
    }
  }
};
