// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "skyline-reside.firebaseapp.com",
  projectId: "skyline-reside",
  storageBucket: "skyline-reside.appspot.com",
  messagingSenderId: "248926835517",
  appId: "1:248926835517:web:fa1f1a942b002624642b54",
  measurementId: "G-5G010MHJGV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);