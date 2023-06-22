import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvpAv6zX-YhuZrLWpOtO-TbiqRRz8eejU",
  authDomain: "todolist-68915.firebaseapp.com",
  projectId: "todolist-68915",
  storageBucket: "todolist-68915.appspot.com",
  messagingSenderId: "1099206889062",
  appId: "1:1099206889062:web:5dc272c6c5738523c367a7",
  measurementId: "G-TE6PK2L343",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
