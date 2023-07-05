import * as ActionType from "../action/index";

const initialState = {
  userData: undefined,
};
//reducer
const loggedInUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOGGED_IN_USER_INFORMATION:
      return {
        ...state,
        userData: action,
      };

    default:
      return state;
  }
};

export default loggedInUserReducer;
