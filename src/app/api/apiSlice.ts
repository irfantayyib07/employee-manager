import { createApi, fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
 reducerPath: "api", // optional
 baseQuery: fetchBaseQuery({ baseUrl: "https://mavenup-backend.vercel.app/" }) as BaseQueryFn,
 tagTypes: ["Employee"],
 endpoints: (builder) => ({}),
});
