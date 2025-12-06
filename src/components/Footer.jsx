import React from 'react';

export default function Footer({ view }) {
    return (
        <footer className={`no-print bg-[#1c1917] text-white py-20 border-t border-stone-800 ${view === 'ai' ? 'mt-0' : 'mt-32'}`}>
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <h3 className="font-display font-black text-3xl tracking-tighter">THE TEN.</h3>
                    </div>
                    <p className="text-stone-400 mb-8 max-w-sm leading-relaxed text-lg font-light">
                        Lighting the way for modern disciples. We bridge ancient wisdom with future-proof faith.
                    </p>
                    <div className="flex gap-4">
                        <span className="bg-stone-800 px-4 py-2 rounded-full text-xs font-bold text-stone-300 tracking-wider uppercase">© 2025</span>
                        <span className="bg-stone-800 px-4 py-2 rounded-full text-xs font-bold text-stone-300 tracking-wider uppercase">Soli Deo Gloria</span>
                    </div>
                </div>
                <div className="bg-stone-800/30 p-10 rounded-3xl border border-stone-800/50 backdrop-blur-sm">
                    <h4 className="font-bold mb-3 text-white text-xl">Join the Movement</h4>
                    <p className="text-sm text-stone-400 mb-6">Daily sparks of wisdom in your inbox. No spam, just substance.</p>
                    <div className="flex gap-3">
                        <input type="email" placeholder="you@email.com" className="bg-stone-900/50 border border-stone-700 rounded-xl px-5 py-4 flex-1 text-sm text-white focus:outline-none focus:border-brand-primary placeholder:text-stone-600" />
                        <button className="bg-white text-brand-dark font-bold px-8 rounded-xl hover:bg-brand-primary hover:text-white transition-all duration-300">Join</button>
                    </div>
                </div>
            </div>
        </footer>
    );
}