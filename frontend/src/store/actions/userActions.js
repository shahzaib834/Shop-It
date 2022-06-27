import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
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

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST,
    });
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `/api/users/register`,
      { name, email, password },
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.user,
    });
  } catch (err) {
    console.log(`data : ${data}`);
    console.log(`err : ${err}`);
    dispatch({
      type: REGISTER_FAIL,
      error: err.response.data.message,
    });
  }
};
