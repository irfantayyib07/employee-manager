import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import supervisorsReducer from "@/features/supervisors/supervisosSlice";

export const store = configureStore({
 reducer: {
  [apiSlice.reducerPath]: apiSlice.reducer,
  supervisors: supervisorsReducer,
 },

 middleware: getDefaultMiddleware => {
  return getDefaultMiddleware().concat(apiSlice.middleware);
 },

 devTools: true
});