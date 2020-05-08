import axios from "axios";
import { returnErrors } from "./errorActions";

import * as types from "./types";

//Check token & load user
export const loadUser = () => (dispatch, getState) => {
  //User loading
  dispatch({ type: types.USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: types.USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: types.AUTH_ERROR,
      });
    });
};

//Register User
export const register = ({ name, email, password }) => (dispatch) => {
  //Headers
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };

  //Request body
  const body = JSON.stringify({ name, email, password });

  axios
    .post("/api/users", body, config)
    .then((res) =>
      dispatch({
        type: types.REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          types.REGISTER_FAIL
        )
      );
      dispatch({
        type: types.REGISTER_FAIL,
      });
    });
};

//Login User
export const login = ({ email, password }) => (dispatch) => {
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //Request body
  const body = JSON.stringify({ email, password });

  axios
    .post("api/auth", body, config)
    .then((res) =>
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: types.LOGIN_FAIL,
      });
    });
};

// Logout User
export const logout = () => {
  return {
    type: types.LOGOUT_SUCCESS,
  };
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
  //Get token from localStorage

  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
