// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAObXAtYusF2FCgjA8DYoJi-ZsEOwx58QI",
  authDomain: "sherehelink.firebaseapp.com",
  projectId: "sherehelink",
  storageBucket: "sherehelink.firebasestorage.app",
  messagingSenderId: "357825798246",
  appId: "1:357825798246:web:7fe1cc497f2414f6540da7",
  measurementId: "G-T456SDNYPN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);