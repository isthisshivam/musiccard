import { USER_ALL_SONGS } from "../action/actions";
export const allSongsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ALL_SONGS: {
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
