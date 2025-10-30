"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../../redux/store/store";

const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      {/* PersistGate ensures the state is rehydrated before rendering the app */}
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
