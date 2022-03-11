import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  OBTAIN_USER,
  SIGN_OFF,
} from "../../types/context-types";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        token: localStorage.getItem("token"),
        isAuth: true,
      };

    case OBTAIN_USER:
      localStorage.setItem("user", JSON.stringify(action.payload))
      return {
        ...state,
        isAuth: true,
        user: {
          id: parseInt(action.payload.id),
          name: action.payload.name,
          lastName: action.payload.lastName,
        },
      };

    case LOGIN_ERROR:
    case SIGN_OFF:
      localStorage.clear();
      return {
        ...state,
        token: null,
        isAuth: null,
        user: null,
      };

    default:
      return state;
  }
};

export default AuthReducer;
