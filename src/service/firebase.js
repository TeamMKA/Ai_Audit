import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { getFirestore } from "firebase/firestore" // Import Firestore

const firebaseConfig = {
    apiKey: "AIzaSyB8ouKSMj-pWhyfYb9MQsH1yRgXjCjZVBc",
    authDomain: "nexus-carpool.firebaseapp.com",
    databaseURL:
        "https://nexus-carpool-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "nexus-carpool",
    storageBucket: "nexus-carpool.appspot.com",
    messagingSenderId: "299194136381",
    appId: "1:299194136381:web:701f92179114ca6751f754",
    measurementId: "G-GSP60SNK4C",
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getFirestore(app) // Initialize Firestore

// Initialize Firebase Authentication and set up Google provider
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

// Function to sign in with Google
const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider)
        .then((result) => {
            // This gives you a Google Access Token
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken

            // The signed-in user info
            const user = result.user
            console.log("User info:", user)
            return user
        })
        .catch((error) => {
            console.error("Error during Google Sign-In:", error)
            throw error
        })
}

export { app, analytics, auth, db, signInWithGoogle }
