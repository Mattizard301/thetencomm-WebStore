import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase (Cerebro conectado)
const firebaseConfig = {
  apiKey: "[REDACTED_FIREBASE_KEY]",
  authDomain: "thetencom-webstore.firebaseapp.com",
  projectId: "thetencom-webstore",
  storageBucket: "thetencom-webstore.firebasestorage.app",
  messagingSenderId: "375338443606",
  appId: "1:375338443606:web:b9297c8add51ec48ca2cf7",
  measurementId: "G-RDG11FJVB3"
};

// Inicializar App
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

// --- FUNCIONES DE LOGIN ---

// Iniciar sesión con Google
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

// Cerrar sesión
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};