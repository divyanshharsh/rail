// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, addDoc } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDuXTEDV4h8KzIGMvZ8vELtnwR7O_Y7raE",
//   authDomain: "railmadad-c3cfe.firebaseapp.com",
//   projectId: "railmadad-c3cfe",
//   storageBucket: "railmadad-c3cfe.appspot.com",
//   messagingSenderId: "363334100942",
//   appId: "1:363334100942:web:08e6fbedfae04c212fad9f",
//   measurementId: "G-JL1LTHHRKS"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firestore, Auth, and Storage
// const db = getFirestore(app);
// const auth = getAuth(app);
// const storage = getStorage(app);

// // Export the instances
// export { auth, db, storage, collection, addDoc, ref, uploadBytes, getDownloadURL };
// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Import Firebase Storage
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration (replace with your config)
const firebaseConfig = {
  apiKey: "AIzaSyDuXTEDV4h8KzIGMvZ8vELtnwR7O_Y7raE",
  authDomain: "railmadad-c3cfe.firebaseapp.com",
  projectId: "railmadad-c3cfe",
  storageBucket: "railmadad-c3cfe.appspot.com",
  messagingSenderId: "363334100942",
  appId: "1:363334100942:web:08e6fbedfae04c212fad9f",
  measurementId: "G-JL1LTHHRKS"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(); // Initialize Firebase Storage

export { db,storage , auth, googleProvider };
