import { createSelector, createEntityAdapter, EntityState, EntityId } from "@reduxjs/toolkit";
import { apiSlice } from "@/app/api/apiSlice";
import { RootState } from "./store";

const employeesAdapter = createEntityAdapter({});

const initialState = employeesAdapter.getInitialState();

type ExtendedEmployee = Employee & { _id: string, __v: number; };
type TypedEmployee = Employee & EntityId

// SLICE

export const extendedApiSlice = apiSlice.injectEndpoints({
 endpoints: (builder) => ({
  getEmployees: builder.query<EntityState<{ id: EntityId; }, EntityId>, void>({
   query: () => "/employees",
   transformResponse: (responseData: ExtendedEmployee[]) => {
    if (!responseData) return;

    responseData.map(employee => {
     delete employee._id;
     delete employee.__v;
    });

    return employeesAdapter.setAll(initialState, responseData);
   },
   providesTags: () => {
    // result is the state (with ids array and entities object)
    return [{ type: "Employee", id: "LIST" }];
   },
  }),

  addNewEmployee: builder.mutation({
   query: (data) => ({
    url: "/employees",
    method: "POST",
    body: {
     data,
    },
   }),
   invalidatesTags: [{ type: "Employee", id: "LIST" }],
  }),

  updateEmployee: builder.mutation({
   query: (data) => ({
    url: `/employees`,
    method: "PUT",
    body: {
     ...data,
    },
   }),
   invalidatesTags: () => [{ type: "Employee", id: "LIST" }],
  }),

  deleteEmployee: builder.mutation({
   query: (id) => ({
    url: `/employees`,
    method: "DELETE",
    body: {
     ...id,
    },
   }),
   invalidatesTags: () => [{ type: "Employee", id: "LIST" }],
  }),
 }),
});

// HOOKS

export const {
 useGetEmployeesQuery,
 useAddNewEmployeeMutation,
 useUpdateEmployeeMutation,
 useDeleteEmployeeMutation,
} = extendedApiSlice;

// SELECTORS (for convenience)

// returns the query result object (from cache)
export const selectEmployeesResult = extendedApiSlice.endpoints.getEmployees.select();

// Creates memoized selector
const selectEmployeesData = createSelector(
 selectEmployeesResult,
 (employeesResult) => employeesResult.data, // normalized state object with ids & entities
);


export const {
 selectAll: selectAllEmployees,
 selectById: selectEmployeeById,
 selectIds: selectEmployeeIds,
 // Pass in a selector that returns the employees slice of state
} = employeesAdapter.getSelectors<RootState>((state) => selectEmployeesData(state) ?? initialState);
