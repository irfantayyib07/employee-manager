import { createSelector, createEntityAdapter, EntityState, EntityId } from "@reduxjs/toolkit";
import { apiSlice } from "@/app/api/apiSlice";
import { RootState } from "./store";

type ExtendedEmployee = Employee & { _id: string, __v: number };

// type ExpandedType = ExpandRecursively<
//  EntityState<Employee, EntityId>
// >;

// { ids: EntityId[], entities: Record<EntityId, Employee>}

// no errors / no intellisense
// EntityState<{ id: EntityId; }, EntityId>

// typeof "employeesAdapter.setAll(initialState, responseData)" = EntityState<{
//  id: EntityId;
// }, EntityId>

const employeesAdapter = createEntityAdapter<Employee>();

const initialState = employeesAdapter.getInitialState();

// SLICE

export const extendedApiSlice = apiSlice.injectEndpoints({
 endpoints: (builder) => ({
  getEmployees: builder.query<EntityState<Employee, string>, void>({
   query: () => "/employees",
   transformResponse: (responseData: ExtendedEmployee[]): EntityState<Employee, string> => {
    if (!responseData) return;

    responseData.map(employee => {
     delete employee._id;
     delete employee.__v;
    });

    return employeesAdapter.setAll(initialState, responseData);
   },
   providesTags: () => {
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
export const selectEmployeesResult = extendedApiSlice.endpoints.getEmployees.select(null);

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
