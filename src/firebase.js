import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1CTlzFUxUDLFmHzBZpBJ5hK8TwYYdd5k",
  authDomain: "fir-f80ea.firebaseapp.com",
  projectId: "fir-f80ea",
  storageBucket: "fir-f80ea.appspot.com",
  messagingSenderId: "217315655776",
  appId: "1:217315655776:web:9e341db7b66d4a373d4305",
  measurementId: "G-V8GJQL3PE6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
