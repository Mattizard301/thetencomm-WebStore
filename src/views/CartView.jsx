import React from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { createCheckout } from '../lib/shopify';

export default function CartView({ cart, removeFromCart, setView }) {
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    // FUNCIÓN MEJORADA: Si tiene foto, muestra foto. Si no, icono.
    const renderVisual = (item) => {
        if (item.image) {
            return <img src={item.image} alt={item.name} className="w-full h-full object-cover" />;
        }
        
        // Fallback para productos digitales
        if (item.icon) {
            const IconComponent = item.icon;
            return <IconComponent className="w-10 h-10 text-stone-500" />;
        }
        return <ShoppingBag className="w-10 h-10 text-stone-500" />;
    };

    return (
        <div className="animate-fade-in pt-16 pb-12 px-6 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <button onClick={() => setView('shop')} className="text-stone-400 hover:text-stone-900 font-bold text-sm flex items-center gap-2 mb-10 group uppercase tracking-widest text-xs">
                    <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> Back to Bazaar
                </button>
                <h2 className="font-display font-black text-5xl mb-12 text-slate-900">Your Bundle</h2>
                
                <div className="bg-white rounded-[2.5rem] border border-stone-100 shadow-xl overflow-hidden">
                    {cart.length === 0 ? (
                        <div className="p-24 text-center">
                            <ShoppingBag className="w-20 h-20 text-stone-200 mx-auto mb-6" />
                            <p className="text-stone-500 text-xl font-medium">Your bundle is empty.</p>
                            <button onClick={() => setView('shop')} className="mt-8 text-brand-primary font-bold hover:underline uppercase tracking-widest text-xs">Explore Gear</button>
                        </div>
                    ) : (
                        <div className="divide-y divide-stone-50">
                            {cart.map((item, idx) => (
                                <div key={idx} className="p-8 flex items-center gap-8">
                                    {/* Contenedor visual actualizado */}
                                    <div className={`w-24 h-24 ${item.color || 'bg-stone-100'} rounded-3xl flex items-center justify-center overflow-hidden shrink-0 border border-stone-100`}>
                                        {renderVisual(item)}
                                    </div>
                                    
                                    <div className="flex-1">
                                        <h4 className="font-display font-bold text-xl text-slate-900 mb-1">{item.name}</h4>
                                        <p className="text-stone-500 text-sm font-medium">{item.category === 'Shopify Drop' ? 'Physical Good' : item.category}</p>
                                        {item.note && (
                                            <span className="inline-block bg-amber-50 text-amber-700 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full mt-3 border border-amber-100">Gift Message Included</span>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <div className="font-display font-bold text-xl text-slate-900 mb-2">{item.price === 0 ? "Free" : `$${item.price}`}</div>
                                        <button onClick={() => removeFromCart(idx)} className="text-xs text-red-400 font-bold hover:text-red-600 uppercase tracking-widest">Remove</button>
                                    </div>
                                </div>
                            ))}
                            <div className="p-10 bg-stone-50 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div>
                                    <p className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-1">Total</p>
                                    <p className="font-display font-black text-5xl text-brand-dark">${total.toFixed(2)}</p>
                                </div>
                                <button 
                                    onClick={() => createCheckout(cart)}
                                    className="bg-brand-dark text-white font-bold py-5 px-16 rounded-2xl hover:bg-orange-500 transition-colors shadow-lg w-full md:w-auto uppercase tracking-widest text-xs"
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}