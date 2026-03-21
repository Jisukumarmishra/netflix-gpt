import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4UglFd-y0f9aNsC8nY7rJd8x9zLh_ZLs",
  authDomain: "netflix-gpt-99261.firebaseapp.com",
  projectId: "netflix-gpt-99261",
  storageBucket: "netflix-gpt-99261.firebasestorage.app",
  messagingSenderId: "910175156904",
  appId: "1:910175156904:web:474dfcf7be92385c48a09d",
  measurementId: "G-W75B2VKJJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();