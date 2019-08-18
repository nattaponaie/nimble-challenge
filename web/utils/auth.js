import 'firebase/auth';
import router from 'next/router';
import firebase from 'firebase/app';

import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT,
} from '/config';

/**
 * Firebase auth
 */

export const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export const firebaseInstance = () => {
  const FIREBASE_CONFIG = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT,
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
  return firebase.auth();
};

export const getCurrentUser = async () => {
  try {
    await firebaseInstance().currentUser;
  } catch (error) {
    throw error;
  }
};

export const signInWithGoogle = async () => {
  try {
    await firebaseInstance().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    router.push(`/`);
  } catch (error) {
    throw error;
  }
};

export const login = async ({ username, password }) => {
  try {
    await firebaseInstance().signInWithEmailAndPassword(username, password);
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    firebaseInstance().signOut();
  } catch (error) {
    throw error;
  }
};

export const register = async ({
  email,
  password,
}) => {
  try {
    await firebaseInstance().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    throw error;
  }
};

export const getUser = () => new Promise((resolve) => {
  firebaseInstance().onAuthStateChanged(user => resolve(user));
});

export const getAccessToken = async () => {
  const user = await getUser();
  if (!user) return null;
  const token = await user.getIdToken();
  return token;
};
