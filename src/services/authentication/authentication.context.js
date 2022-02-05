import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeApp } from "@firebase/app";

import { loginRequest, resgisterRequest } from "./authentication.service";
import { createContext, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyC7E2XHmEvKoR2cIUSipSnha0xu9TaNWuw",
  authDomain: "wassygo.firebaseapp.com",
  projectId: "wassygo",
  storageBucket: "wassygo.appspot.com",
  messagingSenderId: "367827499390",
  appId: "1:367827499390:web:1e0a0658a1ddceca909b2f",
  measurementId: "G-JQ0FSEBGGL",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  onAuthStateChanged(auth, (usr) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(auth, email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onRegister = (email, password, repeatedPassword) => {
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
      return;
    }
    isLoading(true);
    resgisterRequest(auth, email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onLogout = () => {
    setUser(null);
    signOut(auth).then(() => {
      setUser(null);
      setError(null);
    });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
