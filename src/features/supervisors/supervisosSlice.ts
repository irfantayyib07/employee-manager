import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const SUPERVISORS_URL = 'http://localhost:3500/supervisors';

const initialState = []

export const fetchSupervisors = createAsyncThunk('supervisors/fetchSupervisors', async () => {
 const response = await fetch(SUPERVISORS_URL);
 const json = await response.json();
 return json;
})

const supervisorsSlice = createSlice({
 name: 'supervisors',
 initialState,
 reducers: {},
 extraReducers(builder) {
  builder.addCase(fetchSupervisors.fulfilled, (state, action) => {
   return action.payload;
  })
 }
})

export const selectAllSupervisors = (state) => state.supervisors;
export const selectSupervisorById = (state, supervisorId) => {
 return state.supervisors.find(supervisor => parseInt(supervisor.id) === parseInt(supervisorId));
}

export default supervisorsSlice.reducer