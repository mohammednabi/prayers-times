// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAB8sJm9my0v8hE-OfgVcq8Pgt3N9q_GXg",
  authDomain: "prayer-app-1af50.firebaseapp.com",
  projectId: "prayer-app-1af50",
  storageBucket: "prayer-app-1af50.appspot.com",
  messagingSenderId: "933092449527",
  appId: "1:933092449527:web:6a07c26e82dff4946fc7f2",
  measurementId: "G-QZFLYEXYR2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
