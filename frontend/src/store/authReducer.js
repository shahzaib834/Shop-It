import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: {},
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
  isAuthenticated: false,
};

export const login = createAsyncThunk('user/login', async (email, password) => {
  try {
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
    return data.user;
  } catch (err) {
    return err.message;
  }
});

export const register = createAsyncThunk(
  'user/register',
  async (name, email, password, avatar) => {
    try {
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
      return data.user;
    } catch (err) {
      return err.message;
    }
  }
);

export const logOut = createAsyncThunk('user/logout', async () => {
  try {
    await axios.get(`/api/users/logout`);
  } catch (err) {
    return err.message;
  }
});

export const loadUser = createAsyncThunk('user/loadUser', async () => {
  try {
    const { data } = await axios.get(`/api/users/me`);
    return data.user;
  } catch (err) {
    return err.message;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.error.message;
      })
      .addCase(loadUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.status = 'failed';
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.error.message;
      })
      .addCase(logOut.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
