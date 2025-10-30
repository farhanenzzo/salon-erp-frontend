import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { storeToken } from "./src/service/api";

let app, auth;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);

  // Set persistence for auth
  setPersistence(auth, browserLocalPersistence).catch((error) => {
    console.error("Error setting auth persistence:", error);
  });

  // Ensure token is refreshed even on page reload
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const token = await user.getIdToken(true); // Refresh token
        console.log("Firebase Token Refreshed:", token);

        // Call API to store token in HTTP-only cookie
        await storeToken(token);
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    } else {
      console.log("User not signed in, clearing session.");
    }
  });

  // Also listen for token changes
  auth.onIdTokenChanged(async (user) => {
    if (user) {
      try {
        const token = await user.getIdToken(true);
        console.log("Token changed, refreshing:", token);
        await storeToken(token);
      } catch (error) {
        console.error("Error storing new token:", error);
      }
    }
  });
}

export { app, auth };
