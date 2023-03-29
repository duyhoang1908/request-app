import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDicX924t9M_WpAe9Xb_D7wxdkwlIenmcQ",
  authDomain: "request-app-ced1a.firebaseapp.com",
  projectId: "request-app-ced1a",
  storageBucket: "request-app-ced1a.appspot.com",
  messagingSenderId: "460029388853",
  appId: "1:460029388853:web:2cb0b7c2f1ac476c25e97c",
  measurementId: "G-0Y3EXSPJWD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
