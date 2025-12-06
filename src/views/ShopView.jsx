import React, { useState } from 'react';
import { Gift, ShoppingBag, X, CheckCircle } from 'lucide-react'; // Añadimos CheckCircle

export default function ShopView({ resources, addToCart }) {
    const [filter, setFilter] = useState('All');
    const [giftMode, setGiftMode] = useState(false);
    const [quickViewItem, setQuickViewItem] = useState(null);
    
    // Estado para controlar qué botón está mostrando la animación de "Añadido"
    const [addedId, setAddedId] = useState(null);
    
    const categories = ['All', 'Free Guides', 'Study Tools', 'Wearable Faith', 'Shopify Drop'];
    const filtered = filter === 'All' ? resources : resources.filter(p => p.category === filter);

    // Función wrapper para añadir con animación
    const handleAddToCart = (item, mode) => {
        addToCart(item, mode); // Llamamos a la función real
        setAddedId(item.id);   // Activamos la animación para ESTE item
        
        // Quitamos la animación después de 1.5 segundos
        setTimeout(() => {
            setAddedId(null);
        }, 1500);
    };

    const renderIcon = (item) => {
        if (item.icon) {
            const IconComponent = item.icon;
            return <IconComponent className="w-6 h-6" />;
        }
        if (item.iconName === 'ShoppingBag') return <ShoppingBag className="w-6 h-6" />;
        return <ShoppingBag className="w-6 h-6" />;
    };

    const renderLargeIcon = (item) => {
         if (item.icon) {
            const IconComponent = item.icon;
            return <IconComponent className="w-10 h-10" />;
        }
        if (item.iconName === 'ShoppingBag') return <ShoppingBag className="w-10 h-10" />;
        return <ShoppingBag className="w-10 h-10" />;
    };

    return (
        <div className="animate-fade-in bg-[#FDFBF7]">
            <div className="relative w-full overflow-hidden border-b border-stone-100">
                <div className="absolute inset-0 bg-gradient-to-b from-[#F3E5D0] via-[#FDFBF7] to-[#FDFBF7] z-0"></div>
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')] z-0 mix-blend-multiply pointer-events-none"></div>
                <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[120%] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.15),_transparent_60%)] blur-3xl z-0 pointer-events-none"></div>

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((item) => (
                        <div key={item.id} className="group bg-white rounded-[2rem] border border-stone-100 p-6 hover:shadow-2xl transition-all duration-500 flex flex-col relative overflow-hidden">
                            <div className={`absolute top-0 right-0 w-48 h-48 ${item.color} rounded-bl-full opacity-30 -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-700`}></div>
                            
                            <div className={`w-16 h-16 ${item.color} rounded-3xl flex items-center justify-center text-stone-700 mb-6 group-hover:rotate-12 transition-transform duration-500 cursor-pointer shadow-sm`} onClick={() => setQuickViewItem(item)}>
                                {renderIcon(item)}
                            </div>

                            <div className="mb-2">
                                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-400">{item.category}</span>
                            </div>
                            <h3 className="font-cinzel text-xl text-stone-900 mb-2 cursor-pointer hover:text-amber-700 transition-colors" onClick={() => setQuickViewItem(item)}>{item.name}</h3>
                            <p className="text-stone-500 text-xs mb-8 leading-relaxed font-serif italic">{item.description}</p>

                            <div className="mt-auto flex items-center justify-between pt-6 border-t border-stone-50">
                                <div className="font-cinzel font-bold text-lg text-stone-900">{item.price === 0 ? "Free" : `$${item.price}`}</div>
                                
                                <button 
                                    onClick={() => handleAddToCart(item, giftMode ? "Gift" : null)} 
                                    disabled={addedId === item.id} // Evita doble click mientras anima
                                    className={`px-5 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2
                                        ${addedId === item.id 
                                            ? 'bg-green-600 text-white scale-105 shadow-md' 
                                            : giftMode 
                                                ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' 
                                                : 'bg-[#2C1810] text-white hover:bg-stone-700'
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
                    ))}
                </div>
            </div>

            {quickViewItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-[#2C1810]/80 backdrop-blur-md" onClick={() => setQuickViewItem(null)}>
                    <div className="bg-[#FDFBF7] w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl relative animate-scale-in border border-stone-200" onClick={e => e.stopPropagation()}>
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')] pointer-events-none mix-blend-multiply"></div>
                        <button onClick={() => setQuickViewItem(null)} className="absolute top-6 right-6 p-3 bg-stone-100 rounded-full hover:bg-stone-200 transition-colors z-10"><X className="w-5 h-5 text-stone-500" /></button>
                        <div className={`w-24 h-24 ${quickViewItem.color} rounded-[2rem] flex items-center justify-center text-stone-700 mb-8 mx-auto shadow-inner relative z-10`}>
                            {renderLargeIcon(quickViewItem)}
                        </div>
                        <h2 className="font-cinzel text-3xl text-center mb-4 text-[#2C1810] relative z-10">{quickViewItem.name}</h2>
                        <p className="text-center text-stone-600 mb-8 leading-relaxed px-4 font-serif italic relative z-10">{quickViewItem.description}</p>
                        <div className="bg-white p-6 rounded-2xl mb-8 border border-stone-100 relative z-10 shadow-sm">
                            <h4 className="font-bold text-[10px] uppercase tracking-widest text-stone-400 mb-3">Product Details</h4>
                            <p className="text-sm text-stone-600 font-medium leading-relaxed font-sans">High quality materials designed for daily use. Perfect for personal study or as a gift.</p>
                        </div>
                        
                        <button 
                            onClick={() => { 
                                handleAddToCart(quickViewItem, null); 
                                setTimeout(() => setQuickViewItem(null), 500); // Cierra el modal poco después de añadir
                            }} 
                            className={`w-full font-bold py-4 rounded-xl transition-all shadow-lg uppercase tracking-widest text-xs relative z-10 flex justify-center items-center gap-2
                                ${addedId === quickViewItem.id 
                                    ? 'bg-green-600 text-white' 
                                    : 'bg-[#2C1810] text-amber-50 hover:bg-stone-800'
                                }`}
                        >
                            {addedId === quickViewItem.id ? (
                                <>Added to Bundle <CheckCircle className="w-4 h-4" /></>
                            ) : (
                                `Add to Cart - ${quickViewItem.price === 0 ? "Free" : `$${quickViewItem.price}`}`
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}