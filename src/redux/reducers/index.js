import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import notificationReducer from "../slices/notificationSlice";
import draftOrderReducer from "../slices/draftOrderSlice";
import authReducer from "../slices/userSlice";
import permissionsReducer from "../slices/permissionsSlice";
import moduleReducer from "../slices/moduleSlice";
import mastersReducer from "../slices/mastersSlice";
import companyReducer from "../slices/company";

// Config for redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "notifications",
    "draftOrders",
    "auth",
    "permissions",
    "module",
    "company",
  ], // Specify reducers to persist
};

const rootReducer = combineReducers({
  notifications: notificationReducer,
  draftOrders: draftOrderReducer,
  auth: authReducer,
  permissions: permissionsReducer,
  module: moduleReducer,
  masters: mastersReducer,
  company: companyReducer,
});

// Wrap rootReducer with persistReducer
export default persistReducer(persistConfig, rootReducer);
