import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9Ogs8QPMlMwYpUUSU-IFHq0zv1TD3Ywg",
  authDomain: "event-organizer-app-86c56.firebaseapp.com",
  projectId: "event-organizer-app-86c56",
  storageBucket: "event-organizer-app-86c56.firebasestorage.app",
  messagingSenderId: "276046040623",
  appId: "1:276046040623:web:356016856f049956f040da"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
