import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc} from "firebase/firestore";
 
const firebaseConfig = {
    apiKey: "AIzaSyB32Sxglf2GMpaJadK-YY09OIm9tBhHWGE",
    authDomain: "ecity-a11c1.firebaseapp.com",
    databaseURL: "https://ecity-a11c1-default-rtdb.firebaseio.com",
    projectId: "ecity-a11c1",
    storageBucket: "ecity-a11c1.firebasestorage.app",
    messagingSenderId: "780862900180",
    appId: "1:780862900180:web:5422f0a613492e24303841",
    measurementId: "G-QQ8D1YZB08"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, collection, addDoc, onSnapshot, deleteDoc, doc, signInWithEmailAndPassword, onAuthStateChanged, signOut };