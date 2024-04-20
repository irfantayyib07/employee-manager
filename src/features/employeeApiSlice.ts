import { createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice";

// SLICE

export const extendedApiSlice = apiSlice.injectEndpoints({
 endpoints: builder => ({
  getEmployees: builder.query({
   query: () => '/employees',
   providesTags: (result, error, arg) => { // result is the state (with ids array and entities object)
    return [
     { type: 'Employee', id: "LIST" },
     ...result.map(employee => ({ type: 'Employee', id: employee.id }))
    ];
   }
  }),

  addNewEmployee: builder.mutation({
   query: data => ({
    url: '/employees',
    method: 'POST',
    body: {
     ...data,
    }
   }
   ),
   invalidatesTags: [
    { type: 'Employee', id: "LIST" }
   ]
  }),

  updateEmployee: builder.mutation({
   query: data => ({
    url: `/employees/${data.id}`,
    method: 'PUT',
    body: {
     ...data,
    }
   }),
   invalidatesTags: (result, error, arg) => [
    { type: 'Employee', id: arg.id }
   ]
  }),

  deleteEmployee: builder.mutation({
   query: ({ id }) => ({
    url: `/employees/${id}`,
    method: 'DELETE',
    body: { id }
   }),
   invalidatesTags: (result, error, arg) => [
    { type: 'Employee', id: arg.id }
   ]
  }),
 })
});

// HOOKS

export const {
 useGetEmployeesQuery,
 useAddNewEmployeeMutation,
 useUpdateEmployeeMutation,
 useDeleteEmployeeMutation,
} = extendedApiSlice;