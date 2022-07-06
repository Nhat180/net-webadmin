// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAs9hCvZYp5_e_WVI1UBx_-6AolmfU5mJs",
    authDomain: "netcompany-office-tool-db.firebaseapp.com",
    projectId: "netcompany-office-tool-db",
    storageBucket: "netcompany-office-tool-db.appspot.com",
    messagingSenderId: "221750454980",
    appId: "1:221750454980:web:c327e459d075eff35d7791",
    measurementId: "G-6GX9VS1424"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app



