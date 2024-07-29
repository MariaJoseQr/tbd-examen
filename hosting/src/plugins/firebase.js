import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjmoONxLDVi7DAwtCJOuEnIJr5ExOKrFo",
  authDomain: "kepler-school.firebaseapp.com",
  projectId: "kepler-school",
  storageBucket: "kepler-school.appspot.com",
  messagingSenderId: "474059128051",
  appId: "1:474059128051:web:d15344f84ee0d9f7204b86",
  measurementId: "G-8RW0BE3HJ0",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { app, auth, storage, firestore };
