import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  draftOrders: [],
};

const draftOrderSlice = createSlice({
  name: "draftOrders",
  initialState,
  reducers: {
    setDraftOrders: (state, action) => {
      state.draftOrders = [...action.payload];
    },
    addDraftOrder: (state, action) => {
      state.draftOrders = [...action.payload];
    },
    clearDraftOrders: (state) => {
      state.draftOrders = [];
    },
  },
});

export const { setDraftOrders, addDraftOrder, clearDraftOrders } =
  draftOrderSlice.actions;
export default draftOrderSlice.reducer;
