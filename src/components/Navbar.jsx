import React, { useState, useEffect } from 'react'; // Asegúrate de importar useState
import { Flame, ShoppingBag, Menu, X, User, LogOut } from 'lucide-react';

export default function Navbar({ view, setView, cart, streak, isMenuOpen, setIsMenuOpen, user, handleLogin, handleLogout }) {
    const [imgError, setImgError] = useState(false); // Estado para controlar si la imagen falló

    // Reseteamos el error si cambia el usuario
    useEffect(() => {
        setImgError(false);
    }, [user]);

    const navItems = [
        { id: 'home', label: 'Hub' },
        { id: 'law', label: 'The Law' },
        { id: 'blog', label: 'Daily Scroll' },
        { id: 'ai', label: 'The Study' },
        { id: 'shop', label: 'Bazaar' },
    ];

    return (
        <nav className="fixed w-full z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-stone-200/60 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-24 flex justify-between items-center">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
                    <span className="font-display font-black text-3xl tracking-tighter text-brand-dark">THE TEN.</span>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-2 bg-white/50 p-2 rounded-full border border-stone-200/50">
                    {navItems.map(item => (
                        <button 
                            key={item.id}
                            onClick={() => setView(item.id)}
                            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                                view === item.id 
                                ? 'bg-brand-dark text-white shadow-lg' 
                                : 'text-stone-500 hover:text-brand-dark hover:bg-stone-100'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-3 md:gap-5">
                    {/* Racha */}
                    <div className="hidden md:flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full border border-orange-100">
                        <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
                        <span className="text-xs font-bold text-orange-800 uppercase tracking-wider">{streak} Day Streak</span>
                    </div>

                    {/* Carrito */}
                    <button onClick={() => setView('cart')} className="relative p-3 hover:bg-stone-100 rounded-full transition-colors group">
                        <ShoppingBag className="w-5 h-5 text-stone-600 group-hover:text-brand-primary transition-colors" />
                        {cart.length > 0 && <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-brand-primary rounded-full border-2 border-white"></span>}
                    </button>

                    {/* SECCIÓN DE USUARIO / LOGIN - ARREGLADO */}
                    {user ? (
                        <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
                            {/* Lógica: Si hay URL Y no ha dado error, mostramos foto. Si no, icono. */}
                            {user.photoURL && !imgError ? (
                                <img 
                                    src={user.photoURL} 
                                    alt="User" 
                                    className="w-8 h-8 rounded-full border border-stone-200 object-cover" 
                                    onError={() => setImgError(true)} // Si falla, activa el fallback
                                />
                            ) : (
                                <div className="w-8 h-8 bg-stone-200 rounded-full flex items-center justify-center border border-stone-300">
                                    <User className="w-4 h-4 text-stone-500" />
                                </div>
                            )}
                            <button 
                                onClick={handleLogout}
                                className="p-2 hover:bg-red-50 text-stone-400 hover:text-red-500 rounded-full transition-colors"
                                title="Sign Out"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <button 
                            onClick={handleLogin}
                            className="hidden md:flex items-center gap-2 px-5 py-2 bg-stone-900 text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-stone-700 transition-all"
                        >
                            Login
                        </button>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu... (se mantiene igual) */}
             {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-stone-100 p-6 space-y-2 animate-fade-in absolute w-full shadow-2xl">
                    {navItems.map(item => (
                        <button key={item.id} onClick={() => { setView(item.id); setIsMenuOpen(false); }} className="block w-full text-left p-4 rounded-2xl font-bold text-stone-600 hover:bg-stone-50 hover:text-brand-dark uppercase tracking-widest text-sm">{item.label}</button>
                    ))}
                    
                    <div className="border-t border-stone-100 pt-4 mt-4">
                        {!user ? (
                             <button onClick={() => { handleLogin(); setIsMenuOpen(false); }} className="block w-full text-center p-4 rounded-2xl font-bold bg-brand-dark text-white uppercase tracking-widest text-sm">
                                Login with Google
                            </button>
                        ) : (
                            <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block w-full text-center p-4 rounded-2xl font-bold bg-red-50 text-red-600 uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                                <LogOut className="w-4 h-4" /> Sign Out ({user.displayName?.split(' ')[0]})
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}