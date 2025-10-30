import { createSlice } from "@reduxjs/toolkit";

const moduleSlice = createSlice({
  name: "module",
  initialState: {
    currentModuleId: null,
  },
  reducers: {
    setCurrentModule: (state, action) => {
      state.currentModuleId = action.payload;
    },
  },
});

export const { setCurrentModule } = moduleSlice.actions;
export default moduleSlice.reducer;
