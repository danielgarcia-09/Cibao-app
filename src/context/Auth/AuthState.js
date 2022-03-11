import { useReducer } from "react";
import { LOGIN_ERROR, LOGIN_SUCCESS, OBTAIN_USER, SIGN_OFF } from "../../types/context-types";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import AxiosClient from '../../config/axios';
import TokenAuth from "../../config/token";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token") || null,
    isAuth: localStorage.getItem("token") ? true : null,
    user: JSON.parse(localStorage.getItem("user")) || null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Func

  const logIn = async (data) => {
    try {
      const result = await AxiosClient.post("Auth", data);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: result.data,
      });

      getUserAuthenticated();
    } catch (error) {
      console.log(error);
    }
  };

  const getUserAuthenticated = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      TokenAuth(token);
    }

    try {
      const result = await AxiosClient.get("Auth/active-user");
      dispatch({
        type: OBTAIN_USER,
        payload: result.data,
      });
    } catch (error) {
      localStorage.clear();
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  const createUser = async (user) => {
    try {
      await AxiosClient.post("Auth/register", user);
    } catch (error) {
      return;
    }
  };

  const signOut = () => {
    dispatch({
      type: SIGN_OFF,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuth: state.isAuth,
        user: state.user,
        logIn,
        createUser,
        signOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
