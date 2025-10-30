import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers";
import { persistStore } from "redux-persist";

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Avoid errors with non-serializable data in redux-persist
    }),
});

export const persistor = persistStore(store);

export default store;
