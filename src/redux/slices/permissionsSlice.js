import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userPermissions: [],
  isLoaded: false,
  error: null,
};

const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    setUserPermissions: (state, action) => {
      state.userPermissions = action.payload;
      state.isLoaded = true;
      state.error = null;
    },
    updateModulePermission: (state, action) => {
      const { moduleId, canView, canEdit } = action.payload;

      // Find the index of the module to update
      const moduleIndex = state.userPermissions.findIndex(
        (module) => module.moduleId === moduleId
      );

      // If module found, update its permissions
      if (moduleIndex !== -1) {
        state.userPermissions[moduleIndex] = {
          ...state.userPermissions[moduleIndex],
          canView,
          canEdit,
        };
      }
    },
    clearUserPermissions: (state) => {
      state.userPermissions = [];
      state.isLoaded = false;
      state.error = null;
    },
  },
});

export const {
  setUserPermissions,
  updateModulePermission,
  clearUserPermissions,
} = permissionsSlice.actions;

export default permissionsSlice.reducer;
