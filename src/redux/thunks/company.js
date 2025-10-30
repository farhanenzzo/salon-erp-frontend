import { showCompanyDetails } from "../../service/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCompanyDetails } from "../slices/company";

// Async thunk to fetch company details from API
export const fetchCompanyDetails = createAsyncThunk(
  "company/fetchCompanyDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await showCompanyDetails(); // API call
      return response; // Assuming response contains company details
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to update company details and store them in Redux
export const updateCompanyDetails = createAsyncThunk(
  "company/updateCompanyDetails",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await updateCompany(formData); // API call
      if (response.success) {
        dispatch(setCompanyDetails(response.data)); // Update Redux state
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
