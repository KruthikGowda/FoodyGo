import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const loginRequest = (auth, email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const resgisterRequest = (auth, email, password) =>
  createUserWithEmailAndPassword(auth, email, password);
