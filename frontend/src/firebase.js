import { initializeApp } from "firebase/app";
import { 
  getAuth, GoogleAuthProvider, 
  signInWithPopup, signOut, 
  onAuthStateChanged, setPersistence, browserSessionPersistence 
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD2cCrvPIQfOusYupjTP2qbWo3hRQnludQ",
    authDomain: "vnr-outpass.firebaseapp.com",
    projectId: "vnr-outpass",
    storageBucket: "vnr-outpass.firebasestorage.app",
    messagingSenderId: "130639274356",
    appId: "1:130639274356:web:34b3eeb18d3d9cf7c08c21",
    measurementId: "G-VKZSCGRPQ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 🔥 Enable session persistence
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("✅ Session Persistence Enabled");
  })
  .catch((error) => {
    console.error("Session Persistence Error:", error);
  });

export { auth, provider, signInWithPopup, signOut, onAuthStateChanged, };
