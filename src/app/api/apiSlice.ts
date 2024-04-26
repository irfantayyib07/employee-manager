import { createApi, fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
 reducerPath: "api", // optional
 baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/" }),
 tagTypes: ["Employee"],
 endpoints: (builder) => ({}),
});
