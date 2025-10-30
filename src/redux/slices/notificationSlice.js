import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: { count: 0 },
  reducers: {
    incrementNotificationCount(state) {
      state.count += 1;
    },
    resetNotificationCount(state) {
      state.count = 0;
    },
  },
});

export const { incrementNotificationCount, resetNotificationCount } =
  notificationSlice.actions;
export default notificationSlice.reducer;
