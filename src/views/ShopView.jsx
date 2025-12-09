import React, { useState } from 'react';
import { Gift, ShoppingBag, X, CheckCircle, Eye } from 'lucide-react'; 

export default function ShopView({ resources, addToCart }) {
    const [filter, setFilter] = useState('All');
    const [giftMode, setGiftMode] = useState(false);
    const [quickViewItem, setQuickViewItem] = useState(null);
    const [addedId, setAddedId] = useState(null);
    
    const categories = ['All', 'Free Guides', 'Study Tools', 'Wearable Faith', 'Shopify Drop'];
    const filtered = filter === 'All' ? resources : resources.filter(p => p.category === filter);

    const handleAddToCart = (item, mode, e) => {
        e.stopPropagation(); 
        addToCart(item, mode); 
        setAddedId(item.id);   
        setTimeout(() => setAddedId(null), 1500);
    };

    // ESTRATEGIA DE MARKETING: Generar precio falso tachado
    const getFakeOriginalPrice = (price) => {
        if (price === 0) return null;
        // Simplemente multiplicamos por 1.4 (40% más) y redondeamos para que parezca un descuento
        return (price * 1.4).toFixed(0);
    };

    const renderVisual = (item) => {
        if (item.image) {
            return (
                <div className="w-full h-64 bg-stone-100 mb-6 rounded-2xl overflow-hidden relative group-hover:shadow-md transition-all">
                    <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white/90 backdrop-blur text-brand-dark px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                            <Eye className="w-3 h-3" /> Quick View
                        </span>
                    </div>
                </div>
            );
        }
        const IconComponent = item.icon || ShoppingBag;
        return (
            <div className={`w-full h-64 ${item.color || 'bg-stone-100'} mb-6 rounded-2xl flex items-center justify-center text-stone-600 group-hover:scale-[1.02] transition-transform duration-500 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-bl-full"></div>
                <IconComponent className="w-16 h-16 drop-shadow-sm opacity-80" />
            </div>
        );
    };

    return (
        <div className="animate-fade-in bg-[#FDFBF7]">
            <div className="relative w-full overflow-hidden border-b border-stone-100">
                <div className="absolute inset-0 bg-gradient-to-b from-[#F3E5D0] via-[#FDFBF7] to-[#FDFBF7] z-0"></div>
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')] z-0 mix-blend-multiply pointer-events-none"></div>
                
                <div className="pt-12 pb-10 px-6 max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-end justify-between gap-8">
                    <div>
                        <h2 className="font-cinzel text-5xl md:text-8xl text-[#2C1810] mb-4 drop-shadow-sm">The Bazaar</h2>
                        <p className="font-serif text-lg md:text-2xl text-stone-700 italic max-w-md leading-relaxed">
                            Curated tools for the modern disciple. Equip yourself for the journey.
                        </p>
                    </div>
                    
                    <div onClick={() => setGiftMode(!giftMode)} className={`cursor-pointer flex items-center gap-4 p-2 pl-6 pr-2 rounded-full border-2 transition-all duration-300 select-none shadow-sm ${giftMode ? 'border-amber-200 bg-amber-50' : 'border-stone-200 bg-white hover:border-stone-300'}`}>
                        <div className="text-right">
                            <span className={`block text-xs font-bold uppercase tracking-widest ${giftMode ? 'text-amber-800' : 'text-stone-400'}`}>{giftMode ? "Gift Mode On" : "Personal Mode"}</span>
                            <span className="block text-[10px] text-stone-400 font-bold mt-1 font-sans">{giftMode ? "Attach a prayer" : "Equip yourself"}</span>
                        </div>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm transition-all ${giftMode ? 'bg-amber-600' : 'bg-stone-300'}`}>
                            {giftMode ? <Gift className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-10 pb-16 relative z-10">
                <div className="flex flex-wrap gap-3 mb-10">
                    {categories.map(cat => (
                        <button key={cat} onClick={() => setFilter(cat)} className={`px-5 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${filter === cat ? 'bg-[#2C1810] text-amber-50 shadow-lg' : 'bg-white text-stone-500 hover:bg-stone-100 border border-stone-200'}`}>
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((item) => (
                        <div key={item.id} onClick={() => setQuickViewItem(item)} className="group bg-white rounded-[2rem] border border-stone-100 p-4 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col cursor-pointer">
                            {renderVisual(item)}

                            <div className="px-2 pb-2 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        {/* Ocultamos la categoría si es Shopify Drop en la tarjeta también para que sea más limpio */}
                                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-400 block mb-1">
                                            {item.category === 'Shopify Drop' ? 'Collection' : item.category}
                                        </span>
                                        <h3 className="font-cinzel text-xl text-stone-900 group-hover:text-amber-700 transition-colors">{item.name}</h3>
                                    </div>
                                </div>
                                
                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-stone-50">
                                    <div className="flex items-center gap-2">
                                        {/* PRECIO TACHADO (Marketing) */}
                                        {item.price > 0 && (
                                            <span className="text-stone-400 text-xs font-bold line-through decoration-red-300">
                                                ${getFakeOriginalPrice(item.price)}
                                            </span>
                                        )}
                                        <div className="font-cinzel font-bold text-lg text-stone-900">{item.price === 0 ? "Free" : `$${item.price}`}</div>
                                    </div>
                                    
                                    <button 
                                        onClick={(e) => handleAddToCart(item, giftMode ? "Gift" : null, e)} 
                                        disabled={addedId === item.id} 
                                        className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 shadow-sm
                                            ${addedId === item.id 
                                                ? 'bg-green-600 text-white scale-105' 
                                                : giftMode 
                                                    ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' 
                                                    : 'bg-[#1c1917] text-white hover:bg-stone-700'
                                            }`}
                                    >
                                        {addedId === item.id ? (
                                            <>Added <CheckCircle className="w-3 h-3" /></>
                                        ) : (
                                            giftMode ? "Gift This" : "Add to Cart"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MODAL DETALLADO */}
            {quickViewItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-[#2C1810]/80 backdrop-blur-md p-4" onClick={() => setQuickViewItem(null)}>
                    <div className="bg-[#FDFBF7] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl relative animate-scale-in border border-stone-200 grid grid-cols-1 md:grid-cols-2 overflow-hidden" onClick={e => e.stopPropagation()}>
                        
                        <div className="bg-stone-100 h-64 md:h-full relative flex items-center justify-center overflow-hidden">
                            {quickViewItem.image ? (
                                <img src={quickViewItem.image} alt={quickViewItem.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className={`w-full h-full ${quickViewItem.color || 'bg-stone-100'} flex items-center justify-center`}>
                                    {(() => {
                                        const Icon = quickViewItem.icon || ShoppingBag;
                                        return <Icon className="w-32 h-32 text-stone-600 opacity-50" />;
                                    })()}
                                </div>
                            )}
                            <button onClick={() => setQuickViewItem(null)} className="absolute top-4 left-4 p-2 bg-white/50 backdrop-blur rounded-full md:hidden"><X className="w-5 h-5" /></button>
                        </div>

                        <div className="p-8 md:p-12 flex flex-col relative bg-white">
                            <button onClick={() => setQuickViewItem(null)} className="absolute top-6 right-6 p-2 hover:bg-stone-100 rounded-full hidden md:block"><X className="w-6 h-6 text-stone-400" /></button>
                            
                            {/* LIMPIEZA: Si es Shopify Drop, no mostramos el texto 'Shopify Drop', ponemos algo más elegante o nada */}
                            {quickViewItem.category !== 'Shopify Drop' && (
                                <span className="text-amber-700 font-bold text-xs uppercase tracking-widest mb-2">{quickViewItem.category}</span>
                            )}
                            
                            <h2 className="font-cinzel text-3xl md:text-4xl text-[#2C1810] mb-6 leading-tight">{quickViewItem.name}</h2>
                            
                            <div className="prose prose-stone prose-sm mb-8 font-serif text-stone-600 leading-relaxed">
                                {quickViewItem.description}
                            </div>

                            <div className="mt-auto border-t border-stone-100 pt-6">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex flex-col">
                                        {/* PRECIO TACHADO EN MODAL TAMBIÉN */}
                                        {quickViewItem.price > 0 && (
                                            <span className="text-stone-400 text-sm font-bold line-through decoration-red-300">
                                                ${getFakeOriginalPrice(quickViewItem.price)}
                                            </span>
                                        )}
                                        <span className="font-cinzel font-black text-3xl text-stone-900">
                                            {quickViewItem.price === 0 ? "Free" : `$${quickViewItem.price}`}
                                        </span>
                                    </div>
                                    
                                    <button 
                                        onClick={(e) => { 
                                            handleAddToCart(quickViewItem, null, e); 
                                            setTimeout(() => setQuickViewItem(null), 500);
                                        }} 
                                        className={`flex-1 font-bold py-4 rounded-xl transition-all shadow-lg uppercase tracking-widest text-xs flex justify-center items-center gap-2
                                            ${addedId === quickViewItem.id 
                                                ? 'bg-green-600 text-white' 
                                                : 'bg-[#2C1810] text-amber-50 hover:bg-stone-800'
                                            }`}
                                    >
                                        {addedId === quickViewItem.id ? (
                                            <>Added to Bundle <CheckCircle className="w-4 h-4" /></>
                                        ) : (
                                            "Add to Cart"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}