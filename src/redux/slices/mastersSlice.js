import { createSlice } from "@reduxjs/toolkit";

const mastersSlice = createSlice({
  name: "masters",
  initialState: {
    shouldRefetchCategory: false,
    shouldRefetchRole: false,
  },
  reducers: {
    triggerCategoryRefetch: (state) => {
      state.shouldRefetchCategory = true;
    },
    triggerRoleRefetch: (state) => {
      state.shouldRefetchRole = true;
    },
    resetCategoryRefetch: (state) => {
      state.shouldRefetchCategory = false;
    },
    resetRoleRefetch: (state) => {
      state.shouldRefetchRole = false;
    },
  },
});

export const {
  triggerCategoryRefetch,
  triggerRoleRefetch,
  resetCategoryRefetch,
  resetRoleRefetch,
} = mastersSlice.actions;

export default mastersSlice.reducer;
