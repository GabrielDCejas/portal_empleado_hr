import { initializeApp } from 'firebase/app';
import { getAuth, OAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD9mOrFeidfHSowgT5r7VkDH65Im7JzlMw",
    authDomain: "portal-empleado-hr.firebaseapp.com",
    projectId: "portal-empleado-hr",
    storageBucket: "portal-empleado-hr.appspot.com",
    messagingSenderId: "997817922906",
    appId: "1:997817922906:web:8f68f6a1c7cf6a4605af63"
};

// Verifica si ya existe una instancia de la aplicación Firebase
const app = initializeApp(firebaseConfig, 'portal-empleado-hw');

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

const provider = new OAuthProvider('microsoft.com');

export { app, auth, firestore, storage, provider };

import { collection, getDocs } from "firebase/firestore";
