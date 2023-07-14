import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

export const loginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    login: (state, action) => action.payload,
  },
});
export const { actions, reducer } = loginSlice;
