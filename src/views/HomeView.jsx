import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { BookOpen, Heart, VolumeX, Gift, CheckCircle, Flame, Sparkles, ShoppingBag } from 'lucide-react';
import { QUESTS, DAILY_INSPIRATION } from '../data/mockData';

export default function HomeView({ setView, incrementStreak, streak }) {
    const [todaysQuest, setTodaysQuest] = useState(QUESTS[0]);
    const [questCompleted, setQuestCompleted] = useState(false);
    
    // New Habits State
    const [habits, setHabits] = useState([
        { id: 'word', label: 'Scripture', icon: BookOpen, completed: false },
        { id: 'prayer', label: 'Prayer', icon: Heart, completed: false },
        { id: 'silence', label: 'Silence', icon: VolumeX, completed: false },
        { id: 'charity', label: 'Charity', icon: Gift, completed: false }
    ]);

    useEffect(() => {
        // Randomize quest on load if not completed
        const random = QUESTS[Math.floor(Math.random() * QUESTS.length)];
        setTodaysQuest(random);
        
        // Load habits from local storage
        const savedHabits = localStorage.getItem('lumen_habits_today');
        const lastDate = localStorage.getItem('lumen_habits_date');
        const today = new Date().toDateString();

        if (savedHabits && lastDate === today) {
            setHabits(JSON.parse(savedHabits));
        } else {
            localStorage.setItem('lumen_habits_date', today);
        }
    }, []);

    const handleCompleteQuest = () => {
        if (questCompleted) return;
        setQuestCompleted(true);
        incrementStreak();
        
        // Trigger Confetti - Gold and White for holiness
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#FFFFFF', '#FDFBF7'],
            disableForReducedMotion: true
        });
    };

    const toggleHabit = (id) => {
        setHabits(prev => {
            const newHabits = prev.map(h => {
                if (h.id === id) {
                    if (!h.completed) {
                        confetti({
                            particleCount: 40,
                            spread: 50,
                            origin: { y: 0.8 },
                            colors: ['#FFD700'],
                            ticks: 200
                        });
                    }
                    return { ...h, completed: !h.completed };
                }
                return h;
            });
            localStorage.setItem('lumen_habits_today', JSON.stringify(newHabits));
            return newHabits;
        });
    };

    return (
        <div className="animate-fade-in pb-8 bg-[#FDFBF7]">
            {/* HOLY HERO SECTION */}
            <div className="relative w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#F3E5D0] via-[#FDFBF7] to-[#FDFBF7] z-0"></div>
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')] z-0 mix-blend-multiply pointer-events-none"></div>
                <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[120%] h-[1000px] bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.15),_transparent_60%)] blur-3xl z-0 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center pt-8 md:pt-12 pb-10 px-6">
                    <div className="text-center mb-8 max-w-4xl relative">
                        <h1 className="font-serif text-5xl md:text-8xl text-[#2C1810] leading-none mb-4 tracking-tight drop-shadow-sm">
                            The Good <span className="italic text-amber-700/90">Shepherd</span>
                        </h1>
                        <p className="font-serif text-lg md:text-xl text-stone-700 italic max-w-2xl mx-auto font-medium">
                            "He makes me lie down in green pastures. He leads me beside still waters."
                        </p>
                    </div>

                    <div className="relative w-full max-w-6xl aspect-[4/5] md:aspect-[21/9] shadow-2xl z-10 mx-auto">
                        <div className="absolute inset-0 overflow-hidden rounded-t-[1000px] rounded-b-[40px] border-8 border-white bg-white shadow-xl">
                            <img 
                                src="https://images.unsplash.com/photo-1484557985045-edf25e08da73?q=80&w=2073&auto=format&fit=crop" 
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-[20s]" 
                                alt="The Good Shepherd" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/40 to-transparent"></div>
                            <div className="absolute bottom-8 left-0 right-0 text-center">
                                <button onClick={() => setView('law')} className="bg-white/90 backdrop-blur-sm text-[#2C1810] font-serif font-bold italic text-lg px-10 py-3 rounded-full hover:bg-white hover:scale-105 transition-all shadow-lg border border-amber-100/50">
                                    Begin the Journey
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* THE DAILY BREAD */}
            <div className="w-full max-w-7xl mx-auto px-6 mb-12 relative z-10">
                <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-xl border border-stone-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#FDFBF7] opacity-50 pointer-events-none"></div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-stone-200 to-transparent hidden md:block"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                        {/* Left Side: Daily Quest */}
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4">
                                <h3 className="font-serif text-2xl text-[#2C1810] italic mb-1">Daily Act of Grace</h3>
                                <div className="h-1 w-12 bg-amber-300 mx-auto rounded-full"></div>
                            </div>
                            <div className="flex-1 flex flex-col justify-center mb-6">
                                <p className="font-serif text-xl text-stone-600 leading-relaxed">"{todaysQuest.task}"</p>
                            </div>
                            <button 
                                onClick={handleCompleteQuest}
                                disabled={questCompleted}
                                className={`w-full py-3 border-2 rounded-xl font-serif text-lg transition-all ${questCompleted ? 'border-green-500 text-green-700 bg-green-50' : 'border-[#2C1810] text-[#2C1810] hover:bg-[#2C1810] hover:text-white'}`}
                            >
                                {questCompleted ? "Grace Accomplished" : "I Have Done This"}
                            </button>
                        </div>

                        {/* Right Side: Holy Habits */}
                        <div>
                            <div className="mb-6 text-center md:text-left">
                                <h3 className="font-serif text-2xl text-[#2C1810] italic mb-1">Holy Habits to Keep in Mind</h3>
                                <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Daily Disciplines</p>
                            </div>
                            <div className="space-y-3">
                                {habits.map(habit => (
                                    <div key={habit.id} onClick={() => toggleHabit(habit.id)} className={`flex items-center gap-4 p-3 rounded-xl transition-all cursor-pointer border ${habit.completed ? 'bg-amber-50 border-amber-200' : 'bg-transparent border-stone-100 hover:border-stone-300'}`}>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${habit.completed ? 'bg-amber-500 border-amber-500 text-white' : 'bg-white border-stone-200 text-stone-400'}`}>
                                            {habit.completed ? <CheckCircle className="w-5 h-5" /> : <habit.icon className="w-4 h-4" />}
                                        </div>
                                        <div className="flex-1">
                                            <span className={`font-serif text-lg ${habit.completed ? 'text-[#2C1810] line-through decoration-amber-300/50' : 'text-stone-600'}`}>{habit.label}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 text-center">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#2C1810] text-amber-100 rounded-full font-serif italic text-sm">
                                    <Flame className="w-3 h-3 fill-amber-100" /> {streak} Days of Faithfulness
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* THE TRIPTYCH NAVIGATION */}
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-center font-serif text-3xl text-[#2C1810] mb-8 italic">Pathways to Wisdom</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[400px]">
                    {/* Panel 1 */}
                    <div onClick={() => setView('blog')} className="group relative rounded-[50px] md:rounded-t-full md:rounded-b-none border-8 border-white shadow-xl overflow-hidden cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1519681393784-d8e5b5a4570e?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/90 via-[#2C1810]/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-3 text-white">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <h3 className="font-serif text-2xl text-white mb-1">The Scroll</h3>
                            <p className="text-amber-100/80 font-serif italic text-xs">Daily readings & wisdom</p>
                        </div>
                    </div>
                    {/* Panel 2 */}
                    <div onClick={() => setView('ai')} className="group relative rounded-[50px] md:rounded-t-full md:rounded-b-none border-8 border-white shadow-xl overflow-hidden cursor-pointer mt-0 md:-mt-8 z-10">
                        <img src="https://images.unsplash.com/photo-1437603568260-1950d3ca6eab?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/90 via-[#2C1810]/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-3 text-white">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <h3 className="font-serif text-2xl text-white mb-1">The Sanctuary</h3>
                            <p className="text-amber-100/80 font-serif italic text-xs">Speak with the Scholar</p>
                        </div>
                    </div>
                    {/* Panel 3 */}
                    <div onClick={() => setView('shop')} className="group relative rounded-[50px] md:rounded-t-full md:rounded-b-none border-8 border-white shadow-xl overflow-hidden cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1542642838-345388e3639d?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/90 via-[#2C1810]/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-3 text-white">
                                <ShoppingBag className="w-5 h-5" />
                            </div>
                            <h3 className="font-serif text-2xl text-white mb-1">The Bazaar</h3>
                            <p className="text-amber-100/80 font-serif italic text-xs">Tools for the journey</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Verse of the Moment */}
            <div className="max-w-3xl mx-auto text-center relative pt-12 pb-4 px-6">
                <h2 className="font-serif text-3xl md:text-4xl text-[#2C1810] leading-tight mb-4">
                    "{DAILY_INSPIRATION.verse.text}"
                </h2>
                <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-stone-400">
                    {DAILY_INSPIRATION.verse.reference}
                </span>
            </div>
        </div>
    );
}