"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config";
import Loading from "./loading";
import { storeToken } from "../service/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tokenRefreshed, setTokenRefreshed] = useState(false);

  useEffect(() => {
    const handleUser = async (user) => {
      if (user) {
        try {
          // Force refresh token immediately when user is detected
          const token = await user.getIdToken(true);
          await storeToken(token);
          console.log("🔥 Initial token refresh successful");
          setTokenRefreshed(true);
        } catch (error) {
          console.error("Error during initial token refresh:", error);
          setTokenRefreshed(true); // Set to true even on error to prevent infinite loading
        }
      } else {
        setTokenRefreshed(true); // Set to true when no user to prevent infinite loading
      }
      setUser(user);
      setLoading(false);
    };

    // Set up auth state listener
    const unsubscribe = onAuthStateChanged(auth, handleUser);

    // Set up token refresh listener
    const tokenUnsubscribe = auth.onIdTokenChanged(async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken(true);
          await storeToken(token);
          console.log("🔥 Token refreshed from listener");
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
      }
    });

    // Cleanup both listeners
    return () => {
      unsubscribe();
      tokenUnsubscribe();
    };
  }, []);

  // Don't render children until both loading is complete AND initial token refresh is done
  if (loading || !tokenRefreshed) {
    return <Loading />;
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
