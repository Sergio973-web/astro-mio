// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB6STAoc-oBSymk6vkK4MpvnCptXbWdT6I",
  authDomain: "arbol-generalogico.firebaseapp.com",
  databaseURL: "https://arbol-generalogico-default-rtdb.firebaseio.com",
  projectId: "arbol-generalogico",
  storageBucket: "arbol-generalogico.firebasestorage.app",
  messagingSenderId: "1097039168588",
  appId: "1:1097039168588:web:d01e0dec135325fd0320e9",
  measurementId: "G-K6W0ME27NX"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
