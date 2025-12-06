import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast'; // Lo mantenemos para errores o login, pero no para el carrito
import HomeView from './views/HomeView';
import LawView from './views/LawView';
import BlogView from './views/BlogView';
import ShopView from './views/ShopView';
import StudyView from './views/StudyView';
import CartView from './views/CartView';
import { auth, db, loginWithGoogle, logout } from './lib/firebase'; 
import { fetchProducts } from './lib/shopify';
import { RESOURCES } from './data/mockData';

function App() {
    const [view, setView] = useState('home');
    const [cart, setCart] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [toasts, setToasts] = useState([]);
    const [streak, setStreak] = useState(3);
    const [user, setUser] = useState(null);
    
    const [isCartSyncing, setIsCartSyncing] = useState(true); 
    const [products, setProducts] = useState(RESOURCES);

    // --- EFECTOS ---

    // 1. Sesión y Carga Silenciosa
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                console.log("🟢 Usuario conectado:", currentUser.email);
                setUser(currentUser);
                setIsCartSyncing(true); 
                await loadCloudCart(currentUser.uid);
                setIsCartSyncing(false); 
            } else {
                console.log("🔴 Usuario desconectado");
                setUser(null);
                setCart([]); 
                setIsCartSyncing(false);
            }
        });
        return () => unsubscribe();
    }, []);

    // 2. Cargar Shopify
    useEffect(() => {
        async function loadShopify() {
            const realProducts = await fetchProducts();
            if (realProducts.length > 0) {
                setProducts([...RESOURCES, ...realProducts]); 
            }
        }
        loadShopify();
    }, []);

    // 3. Guardar en Nube (Silencioso)
    useEffect(() => {
        if (isCartSyncing) return;

        const saveToCloud = async () => {
            localStorage.setItem('lumen_cart', JSON.stringify(cart));

            if (user) { 
                try {
                    // Limpieza de iconos antes de subir
                    const sanitizedCart = cart.map(item => {
                        const { icon, ...rest } = item;
                        return rest;
                    });

                    const userDocRef = doc(db, "users", user.uid);
                    await setDoc(userDocRef, { cart: sanitizedCart }, { merge: true });
                    console.log("☁️ Sync OK");
                } catch (e) {
                    console.error("Error guardando:", e);
                }
            }
        };
        
        const timeoutId = setTimeout(() => saveToCloud(), 500);
        return () => clearTimeout(timeoutId);
    }, [cart, user, isCartSyncing]); 

    // 4. Persistencia Local
    useEffect(() => {
        const savedStreak = localStorage.getItem('lumen_streak');
        if (savedStreak) setStreak(parseInt(savedStreak));
    }, []);
    
    useEffect(() => {
        localStorage.setItem('lumen_streak', streak.toString());
    }, [streak]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [view]);

    // --- FUNCIONES ---

    const loadCloudCart = async (uid) => {
        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists() && docSnap.data().cart) {
                // Ya NO mostramos el mensaje "Restored". Es silencioso.
                setCart(docSnap.data().cart);
            }
        } catch (error) {
            console.error("Error cargando:", error);
        }
    };

    const handleLogin = async () => {
        try {
            await loginWithGoogle();
            showToast("Welcome", "Successfully connected.");
        } catch (error) {
            showToast("Error", "Could not sign in.");
        }
    };

    const handleLogout = async () => {
        await logout();
        showToast("Goodbye", "See you soon.");
        setView('home');
    };

    const showToast = (title, message) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, title, message }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));
    const incrementStreak = () => setStreak(s => s + 1);

    const addToCart = (product, note = null) => {
        // Ya NO mostramos toast aquí. La animación la hará el botón.
        setCart(prevCart => [...prevCart, { ...product, note }]);
    };
    
    const removeFromCart = (idx) => { 
        setCart(prevCart => {
            const newCart = [...prevCart];
            newCart.splice(idx, 1);
            return newCart;
        });
    };

    return (
        <div className="min-h-screen flex flex-col font-sans text-brand-dark bg-[#FDFBF7]">
            <Toast toasts={toasts} removeToast={removeToast} />
            
            <Navbar 
                view={view} 
                setView={setView} 
                cart={cart} 
                streak={streak} 
                isMenuOpen={isMenuOpen} 
                setIsMenuOpen={setIsMenuOpen}
                user={user}             
                handleLogin={handleLogin}   
                handleLogout={handleLogout} 
            />

            <main className="flex-grow pt-24">
                {view === 'home' && <HomeView setView={setView} incrementStreak={incrementStreak} streak={streak} />}
                {view === 'law' && <LawView />}
                {view === 'blog' && <BlogView />}
                {view === 'shop' && <ShopView resources={products} addToCart={addToCart} />}
                {view === 'ai' && <StudyView resources={RESOURCES} addToCart={addToCart} user={user} showToast={showToast} />}
                {view === 'cart' && <CartView cart={cart} removeFromCart={removeFromCart} setView={setView} />}
            </main>
            
            <Footer view={view} />
        </div>
    );
}

export default App;