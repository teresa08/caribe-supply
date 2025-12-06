// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAgPW0ch3E0aMGwkVCjqW9snVso1aQnmSY",
  authDomain: "caribesupply.firebaseapp.com",
  projectId: "caribesupply",
  storageBucket: "caribesupply.firebasestorage.app",
  messagingSenderId: "331267133956",
  appId: "1:331267133956:web:45649619d8dfdb4c319b51"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
