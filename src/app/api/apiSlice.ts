import { createApi, fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
 reducerPath: "api", // optional
 baseQuery: fetchBaseQuery({ baseUrl: "https://employee-manager-be.vercel.app/" }),
 tagTypes: ["Employee"],
 endpoints: (builder) => ({}),
});
