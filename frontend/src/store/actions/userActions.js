import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAIL,
} from './types';

import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      error: err.response.data.message,
    });
  }
};

export const register = (name, email, password, avatar) => async (dispatch) => {
  try {
    console.log(avatar);
    dispatch({
      type: REGISTER_REQUEST,
    });
    const config = {
      header: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const { data } = await axios.post(
      `/api/users/register`,
      { name, email, password, avatar },
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.user,
    });
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      error: err.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_USER_REQUEST,
    });

    const { data } = await axios.get(`/api/users/me`);

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (err) {
    dispatch({
      type: LOAD_USER_FAIL,
      error: err.response.data.message,
    });
  }
};

export const logOut = () => async (dispatch) => {
  try {
    dispatch({
      type: LOG_OUT_REQUEST,
    });

    const { data } = await axios.get(`/api/users/logout`);

    dispatch({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: LOG_OUT_FAIL,
      error: err.response.data.message,
    });
  }
};
