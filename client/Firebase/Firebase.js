// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCj_Yszj34x5e166rorUEnIWgBzIbRJ4Zo",
  authDomain: "mind-cache-ai.firebaseapp.com",
  projectId: "mind-cache-ai",
  storageBucket: "mind-cache-ai.appspot.com",
  messagingSenderId: "351265615944",
  appId: "1:351265615944:web:a80891cbffab855ef0a87d",
  measurementId: "G-8L6EEYGCXC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);