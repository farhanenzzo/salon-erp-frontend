import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  role: null,
  token: null,
  roleId: null,
  isAuthenticated: false,
  email: null,
  profilePicture: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, role, token, roleId, email, profilePicture } =
        action.payload;
      state.user = user;
      state.role = role;
      state.token = token;
      state.roleId = roleId;
      state.profilePicture = profilePicture;
      state.email = email;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
      state.roleId = null;
      state.isAuthenticated = false;
      state.profilePicture = null;
      state.email = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
