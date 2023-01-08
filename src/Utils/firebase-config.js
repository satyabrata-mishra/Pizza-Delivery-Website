import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBfmTE7x8qJ0vSz3MXr3yEZOOGfZUNXvv0",
  authDomain: "pizza-delivery-site.firebaseapp.com",
  projectId: "pizza-delivery-site",
  storageBucket: "pizza-delivery-site.appspot.com",
  messagingSenderId: "34421492611",
  appId: "1:34421492611:web:d29cf1095e41b9eddbc4b6",
  measurementId: "G-JNE3GBF7SE"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);