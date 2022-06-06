import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtICBAfrP8rwIzadOxmQ0mMRfm2fy_sYU",
  authDomain: "todo-f1028.firebaseapp.com",
  projectId: "todo-f1028",
  storageBucket: "todo-f1028.appspot.com",
  messagingSenderId: "1026853904383",
  appId: "1:1026853904383:web:344455356aac6e913b11ca",
  measurementId: "G-XYL6YWLPBL"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export const tasksRef = collection(db, "task");
export const usersRef = collection(db, "users");
export const grouptaskRef = collection(db, "grouptask");