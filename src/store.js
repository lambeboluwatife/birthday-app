import { configureStore } from "@reduxjs/toolkit";
import birthdayReducer from "./slices/birthdaySlice";

export const store = configureStore({
  reducer: {
    birthday: birthdayReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});
