import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
 reducerPath: "api", // optional
 baseQuery: fetchBaseQuery({ baseUrl: "https://mavenup-backend.vercel.app/" }),
 tagTypes: ["Employee"],
 endpoints: (builder) => ({}),
});
