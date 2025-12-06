import React from 'react';
import { CheckCircle, X } from 'lucide-react';

export default function Toast({ toasts, removeToast }) {
    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4 pointer-events-none">
            {toasts.map(toast => (
                <div key={toast.id} className="bg-white text-brand-dark px-6 py-4 rounded-full shadow-2xl flex items-center gap-4 animate-slide-in-right pointer-events-auto min-w-[300px] border border-stone-100">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <div>
                        <h4 className="font-bold text-sm">{toast.title}</h4>
                        <p className="text-xs text-stone-500">{toast.message}</p>
                    </div>
                    <button onClick={() => removeToast(toast.id)} className="ml-auto text-stone-300 hover:text-brand-dark">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    );
}