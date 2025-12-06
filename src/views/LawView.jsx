import React, { useState, useEffect } from 'react';
import { Printer, ArrowRight, X } from 'lucide-react';
import { COMMANDMENTS } from '../data/mockData';

export default function LawView() {
    const [activeModal, setActiveModal] = useState(null);
    const [revealedIds, setRevealedIds] = useState([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('data-id');
                    setRevealedIds(prev => [...prev, parseInt(id)]);
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.commandment-card');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="animate-fade-in bg-[#FDFBF7]">
            {/* HERO */}
            <div className="relative w-full overflow-hidden border-b border-stone-100">
                <div className="absolute inset-0 bg-gradient-to-b from-[#F3E5D0] via-[#FDFBF7] to-[#FDFBF7] z-0"></div>
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')] z-0 mix-blend-multiply pointer-events-none"></div>
                <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[120%] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.15),_transparent_60%)] blur-3xl z-0 pointer-events-none"></div>

                <div className="pt-12 pb-10 px-6 max-w-5xl mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-8xl font-cinzel text-[#2C1810] leading-tight mb-4 drop-shadow-sm">
                        THE TEN <br/> COMMANDMENTS
                    </h1>
                    <div className="max-w-2xl mx-auto space-y-4">
                        <p className="font-cinzel text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-amber-800">
                            A Foundation for Moral Law & Spiritual Liberty
                        </p>
                        <p className="font-serif text-lg md:text-xl text-stone-700 leading-relaxed italic">
                            "Written on stone by the finger of God, these ancient words have shaped history, law, and the human conscience for thousands of years."
                        </p>
                    </div>
                    <div className="mt-8 flex justify-center">
                        <button 
                            onClick={() => document.getElementById('manuscript').scrollIntoView({ behavior: 'smooth' })}
                            className="group flex flex-col items-center gap-2 text-[#2C1810] font-cinzel font-bold text-xs uppercase tracking-[0.2em] hover:text-amber-800 transition-colors"
                        >
                            Read The Law
                            <div className="h-6 w-px bg-stone-300 group-hover:bg-amber-800 transition-colors"></div>
                        </button>
                    </div>
                </div>
            </div>

            {/* THE MANUSCRIPT */}
            <div id="manuscript" className="pt-8 pb-16 w-full max-w-[95%] mx-auto px-4 relative z-10">
                <div className="mb-8 text-center animate-fade-in delay-100">
                    <p className="font-serif text-xl md:text-2xl text-stone-600 italic leading-relaxed max-w-4xl mx-auto mb-4">
                        "We look at the commandments not to earn salvation, but to understand the character of the King."
                    </p>
                    <button onClick={handlePrint} className="inline-flex items-center gap-2 px-6 py-2 bg-white border border-stone-200 text-stone-600 font-cinzel text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all shadow-sm hover:shadow-md hover:border-amber-200">
                        <Printer className="w-3 h-3" /> Download PDF
                    </button>
                </div>

                {/* PARCHMENT CONTAINER */}
                <div className="relative bg-white p-8 md:p-12 shadow-2xl rounded-sm border border-stone-100">
                    <div className="absolute inset-0 bg-[#FDFBF7] opacity-30 pointer-events-none mix-blend-multiply"></div>
                    <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-stone-400"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-stone-400"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-stone-400"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-stone-400"></div>

                    <div className="space-y-8 relative z-10">
                        <div className="absolute left-6 md:-left-8 top-0 bottom-0 w-px bg-stone-200 -z-10 hidden md:block"></div>

                        {COMMANDMENTS.map((cmd) => {
                            const isVisible = revealedIds.includes(cmd.id);
                            return (
                                <div 
                                    key={cmd.id}
                                    data-id={cmd.id}
                                    onClick={() => setActiveModal(cmd)}
                                    className={`commandment-card group relative md:pl-12 cursor-pointer transition-all duration-1000 ease-out border-b border-stone-100 pb-6 last:border-0 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                                >
                                    <div className="hidden md:flex absolute -left-12 top-2 w-10 h-10 bg-[#FDFBF7] border border-stone-300 items-center justify-center rounded-full font-cinzel font-bold text-stone-400 group-hover:border-amber-600 group-hover:text-amber-600 group-hover:scale-125 transition-all duration-500 z-10 shadow-sm">
                                        {cmd.id}
                                    </div>

                                    <div className="transition-all duration-500 group-hover:translate-x-2">
                                        <div className="md:hidden text-amber-700 font-bold font-cinzel text-xl mb-1 flex items-center gap-3">
                                            <span className="w-8 h-px bg-amber-700"></span> {cmd.id}
                                        </div>
                                        <h2 className="text-2xl md:text-4xl font-cinzel text-[#2C1810] mb-2 group-hover:text-amber-700 transition-colors leading-tight">
                                            {cmd.meaning}
                                        </h2>
                                        <p className="text-stone-400 font-serif italic text-lg md:text-xl line-through decoration-transparent group-hover:decoration-stone-300 group-hover:text-stone-500 transition-all">
                                            {cmd.text}
                                        </p>
                                        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold uppercase tracking-widest text-amber-700 flex items-center gap-2 font-sans">
                                            Uncover Meaning <ArrowRight className="w-3 h-3" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {activeModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-[#2C1810]/60 backdrop-blur-sm transition-opacity" onClick={() => setActiveModal(null)}></div>
                    <div className="bg-[#FDFBF7] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl relative animate-scale-in p-10 md:p-16 border border-stone-200">
                        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')]"></div>
                        <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-900 transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                        <div className="mb-8 flex justify-center">
                            <span className="text-9xl font-cinzel text-stone-100 font-bold -mt-8">{activeModal.id}</span>
                        </div>
                        <div className="text-center mb-12 relative -mt-20">
                            <h2 className="text-4xl md:text-5xl font-cinzel text-[#2C1810] mb-4">{activeModal.text}</h2>
                            <div className="flex items-center justify-center gap-4">
                                <span className="h-px w-12 bg-amber-700"></span>
                                <p className="text-amber-700 font-bold uppercase text-xs tracking-[0.2em] font-sans">{activeModal.meaning}</p>
                                <span className="h-px w-12 bg-amber-700"></span>
                            </div>
                        </div>
                        <div className="prose prose-stone prose-lg mx-auto font-serif text-xl leading-relaxed text-stone-700">
                            <p className="first-letter:text-6xl first-letter:font-cinzel first-letter:text-[#2C1810] first-letter:float-left first-letter:mr-4 first-letter:mt-[-12px]">
                                {activeModal.deepDive}
                            </p>
                            <div className="mt-12 pt-8 border-t border-double border-stone-200">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-6 text-center font-sans">Scripture References</h4>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {activeModal.scriptures.map(s => (
                                        <span key={s} className="bg-white border border-stone-200 px-4 py-2 text-sm font-bold text-stone-600 rounded-sm font-sans uppercase tracking-wider shadow-sm">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}