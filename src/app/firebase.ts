// src/firebase.js
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, signInAnonymously, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, type Auth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs, onSnapshot, type Firestore } from 'firebase/firestore';

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let authReadyPromise: Promise<void> | undefined;

export const initFirebase = () => {
  if (typeof window !== 'undefined' && !app) {
    const firebaseConfig = process.env.NEXT_PUBLIC_FIREBASE_CONFIG ? JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG) : {};
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);

    authReadyPromise = new Promise<void>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth!, async (user) => {
        if (!user) {
          try {
            await signInAnonymously(auth!);
            console.log("Signed in anonymously.");
          } catch (error) {
            console.error("Error signing in anonymously:", error);
          }
        }
        unsubscribe();
        resolve();
      });
    });
  }
  return { app, auth, db, authReadyPromise };
};

export const getFirebaseServices = () => {
  if (!app) {
    return initFirebase();
  }
  return { app, auth, db, authReadyPromise };
};

export { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, doc, setDoc, getDoc, collection, query, where, getDocs, onSnapshot };
