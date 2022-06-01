import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAs9hCvZYp5_e_WVI1UBx_-6AolmfU5mJs",
    authDomain: "netcompany-office-tool-db.firebaseapp.com",
    projectId: "netcompany-office-tool-db",
    storageBucket: "netcompany-office-tool-db.appspot.com",
    messagingSenderId: "221750454980",
    appId: "1:221750454980:web:c327e459d075eff35d7791",
    measurementId: "G-6GX9VS1424"
  };


  //Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export {
      db
  }