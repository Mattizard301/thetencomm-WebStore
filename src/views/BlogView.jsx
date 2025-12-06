import React, { useState } from 'react';
import { BookOpen, Feather, Sparkles, ArrowRight, X } from 'lucide-react';
import { BLOG_POSTS, DAILY_INSPIRATION } from '../data/mockData';

export default function BlogView() {
    const [activePost, setActivePost] = useState(null);
    const [activeCategory, setActiveCategory] = useState("All");
    
    const categories = ["All", "Discipline", "Theology", "Culture"];
    const filteredPosts = activeCategory === "All" ? BLOG_POSTS : BLOG_POSTS.filter(p => p.category === activeCategory);

    return (
        <div className="animate-fade-in bg-[#FDFBF7]">
            <div className="relative w-full overflow-hidden border-b border-stone-100">
                <div className="absolute inset-0 bg-gradient-to-b from-[#F3E5D0] via-[#FDFBF7] to-[#FDFBF7] z-0"></div>
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')] z-0 mix-blend-multiply pointer-events-none"></div>
                <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[120%] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.15),_transparent_60%)] blur-3xl z-0 pointer-events-none"></div>

                <div className="pt-12 pb-10 px-6 max-w-6xl mx-auto text-center relative z-10">
                    <h2 className="font-cinzel text-5xl md:text-8xl text-[#2C1810] mb-4 drop-shadow-sm">The Daily Scroll</h2>
                    <div className="w-24 h-1 bg-amber-300 mx-auto mb-6 rounded-full"></div>
                    <p className="font-serif text-lg md:text-2xl text-stone-700 italic max-w-2xl mx-auto leading-relaxed">
                        Reflections on theology, culture, and the quiet work of grace in a loud world.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 pt-10 pb-16 relative z-10">
                {/* Daily Inspiration Dashboard */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                    {/* Verse Card */}
                    <div className="bg-[#2C1810] rounded-[2rem] p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl border border-stone-800">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')] opacity-10 mix-blend-overlay"></div>
                        <div className="absolute top-0 right-0 p-10 opacity-10"><BookOpen className="w-40 h-40" /></div>
                        <div className="relative z-10">
                            <span className="text-amber-200 font-bold text-xs uppercase tracking-widest mb-4 block">Verse of the Day</span>
                            <p className="font-serif italic text-xl md:text-2xl leading-relaxed text-amber-50">"{DAILY_INSPIRATION.verse.text}"</p>
                        </div>
                        <div className="mt-8 border-t border-stone-700 pt-4 relative z-10">
                            <span className="text-stone-400 font-bold text-sm tracking-wide">{DAILY_INSPIRATION.verse.reference}</span>
                        </div>
                    </div>

                    {/* Quote & Action */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <div className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-lg flex flex-col justify-center relative overflow-hidden flex-1 group hover:shadow-xl transition-all duration-500">
                            <Feather className="absolute top-8 right-8 w-8 h-8 text-stone-200 group-hover:text-amber-200 transition-colors" />
                            <p className="text-xl md:text-3xl text-stone-800 font-serif italic mb-4 leading-relaxed">"{DAILY_INSPIRATION.quote.text}"</p>
                            <div className="flex items-center gap-4">
                                <div className="h-0.5 w-12 bg-amber-400"></div>
                                <span className="text-sm font-bold uppercase tracking-widest text-stone-400">{DAILY_INSPIRATION.quote.author}</span>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-amber-50 to-[#FDFBF7] p-8 rounded-[2rem] border border-amber-100 flex items-center gap-6 flex-1 shadow-sm">
                            <div className="bg-white p-4 rounded-2xl shadow-sm text-amber-600 shrink-0 border border-amber-50">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="text-amber-700 font-bold text-xs uppercase tracking-widest mb-1 block">Kingdom Action</span>
                                <h4 className="font-cinzel text-lg text-stone-900 mb-1">{DAILY_INSPIRATION.action.title}</h4>
                                <p className="text-sm text-stone-600 leading-relaxed font-serif italic">{DAILY_INSPIRATION.action.task}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="flex items-center justify-between mb-8 border-b border-stone-200 pb-4">
                    <h3 className="font-cinzel font-bold text-xl md:text-2xl text-stone-900">Recent Writings</h3>
                    <div className="flex gap-2">
                        {categories.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-1.5 rounded-sm text-[10px] md:text-xs font-bold uppercase tracking-wide transition-all ${activeCategory === cat ? 'bg-[#2C1810] text-amber-50' : 'bg-white text-stone-500 hover:bg-stone-100 border border-stone-200'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredPosts.map(post => (
                        <div key={post.id} onClick={() => setActivePost(post)} className="group cursor-pointer">
                            <div className="bg-white rounded-[1rem] overflow-hidden border border-stone-100 shadow-sm group-hover:shadow-2xl transition-all duration-500 h-full flex flex-col hover:-translate-y-2">
                                <div className="h-48 bg-stone-100 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent"></div>
                                    <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-sm text-[9px] font-bold text-stone-900 uppercase tracking-widest border border-stone-200">{post.category}</span>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-3 text-[9px] font-bold text-stone-400 mb-3 uppercase tracking-widest">
                                        <span>{post.date}</span> • <span>{post.readTime}</span>
                                    </div>
                                    <h3 className="font-cinzel text-lg text-stone-900 mb-3 group-hover:text-amber-700 transition-colors leading-tight">{post.title}</h3>
                                    <p className="text-stone-500 text-xs leading-relaxed mb-6 line-clamp-3 flex-1 font-serif">{post.excerpt}</p>
                                    <div className="flex items-center text-[10px] font-bold text-[#2C1810] uppercase tracking-widest group-hover:gap-2 transition-all border-t border-stone-100 pt-4">
                                        Read Article <ArrowRight className="w-3 h-3 ml-1" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reading Modal */}
            {activePost && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-[#2C1810]/80 backdrop-blur-md" onClick={() => setActivePost(null)}>
                    <div className="bg-[#FDFBF7] w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl relative animate-scale-in border border-stone-200" onClick={e => e.stopPropagation()}>
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')] pointer-events-none mix-blend-multiply"></div>
                        <button onClick={() => setActivePost(null)} className="sticky top-8 right-8 float-right p-3 bg-stone-100 rounded-full hover:bg-stone-200 transition-colors z-10"><X className="w-5 h-5 text-stone-600" /></button>
                        <div className="p-12 md:p-24 relative z-10">
                            <div className="text-center mb-16">
                                <span className="text-amber-700 font-bold uppercase tracking-[0.2em] text-xs mb-6 block">{activePost.category}</span>
                                <h2 className="font-cinzel text-4xl md:text-6xl text-[#2C1810] mb-8 leading-tight">{activePost.title}</h2>
                                <div className="flex justify-center items-center gap-6 text-xs font-bold text-stone-400 uppercase tracking-widest">
                                    <span>{activePost.date}</span>
                                    <span className="w-1.5 h-1.5 bg-stone-300 rounded-full"></span>
                                    <span>{activePost.readTime}</span>
                                </div>
                            </div>
                            <div className="prose prose-lg mx-auto text-stone-700 font-serif leading-loose first-letter:text-5xl first-letter:font-cinzel first-letter:text-[#2C1810] first-letter:float-left first-letter:mr-4 first-letter:mt-[-10px]">
                                {activePost.content}
                            </div>
                            <div className="mt-20 pt-10 border-t border-stone-200 text-center">
                                <p className="text-stone-400 font-serif italic">Share this reflection...</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}