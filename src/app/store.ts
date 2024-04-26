import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
 reducer: {
  [apiSlice.reducerPath]: apiSlice.reducer,
 },

 middleware: (getDefaultMiddleware) => {
  return getDefaultMiddleware().concat(apiSlice.middleware);
 },

 devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
