import { createSlice } from "@reduxjs/toolkit";
import { fetchCompanyDetails } from "../thunks/company";

export const companySlice = createSlice({
  name: "company",
  initialState: {
    name: "",
    country: "",
    city: "",
    address: "",
    loading: false,
    error: null,
  },
  reducers: {
    setCompanyDetails: (state, action) => {
      state.name = action.payload.name;
      state.country = action.payload.country;
      state.city = action.payload.city;
      state.address = action.payload.address;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompanyDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name;
        state.country = action.payload.country;
        state.city = action.payload.city;
        state.address = action.payload.address;
      })
      .addCase(fetchCompanyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCompanyDetails } = companySlice.actions;
export const selectCompany = (state) => state.company;
export default companySlice.reducer;
