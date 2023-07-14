import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./login/login.slice";
export const store = configureStore({
  reducer,
});
