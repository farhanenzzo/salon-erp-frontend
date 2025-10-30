import { fetchRoles } from "../../service/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRolesThunk = createAsyncThunk(
  "roles/fetchRoles",
  async () => {
    const response = await fetchRoles();
    return response;
  }
);

const rolesSlice = createSlice({
  name: "roles",
  initialState: {
    roles: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addRole(fetchRolesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addRole(fetchRolesThunk.fulfilled, (state, action) => {
        state.roles = action.payload;
        state.loading = false;
      })
      .addRole(fetchRolesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default rolesSlice.reducer;
