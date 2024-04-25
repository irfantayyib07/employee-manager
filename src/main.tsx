import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";
import "./output.css";
import { extendedApiSlice } from "./app/employeeApiSlice.ts";

store.dispatch(extendedApiSlice.endpoints.getEmployees.initiate(null)); // initiate thunk

ReactDOM.createRoot(document.getElementById("root")!).render(
 // <React.StrictMode>
 <Provider store={store}>
  <BrowserRouter>
   <Routes>
    <Route path="/*" element={<App />} />
   </Routes>
  </BrowserRouter>
 </Provider>,
 // </React.StrictMode>,
);
