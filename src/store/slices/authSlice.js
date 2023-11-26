import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: sessionStorage.getItem("ytc-access-token")
    ? sessionStorage.getItem("ytc-access-token")
    : null,
  user: sessionStorage.getItem("ytc-user")
    ? JSON.parse(sessionStorage.getItem("ytc-user"))
    : null,
  oauth: sessionStorage.getItem("ytc-oauth-token")
    ? JSON.parse(sessionStorage.getItem("ytc-oauth-token"))
    : null,

  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.oauth = action.payload.oauth;
      state.user = action.payload.user;
      state.error = null;
    },
    logoutUser: (state) => {
      state.accessToken = null;
      state.oauth = null;
      state.user = null;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, logoutUser, setError } = authSlice.actions;

export const getUser = (state) => state.auth.user;

export const isLoggedIn = (state) => {
  return state.auth.user ? true : false;
};

export default authSlice.reducer;
