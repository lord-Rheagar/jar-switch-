
import React from 'react';
import { Vice, ViewType } from '../types';
import { getIconByType, IconArrowRight, IconPlus, IconAlertTriangle } from './Icons';

interface HomeViewProps {
    balance: number;
    goldGrams: number;
    vices: Vice[];
    onViceSelect: (vice: Vice) => void;
    onOpenModal: () => void;
    onOpenSinTaxModal: () => void;
    setActiveView: (view: ViewType) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ 
    balance, 
    goldGrams, 
    vices, 
    onViceSelect, 
    onOpenModal,
    onOpenSinTaxModal,
    setActiveView 
}) => {
    return (
        <div className="p-6 space-y-8 animate-slide-up h-full flex flex-col">
            <div className="text-center space-y-2 py-4 shrink-0">
                <p className="text-purple-300/70 text-xs uppercase tracking-widest font-semibold">Total Saved from Habits</p>
                <h1 className="text-5xl font-extrabold text-gold-gradient drop-shadow-sm tracking-tight">
                    ₹{balance.toLocaleString()}
                </h1>
                <p className="text-purple-300 text-sm font-medium">≈ {goldGrams.toFixed(4)} gms Gold</p>
            </div>

            <div className="flex flex-col flex-grow min-h-0">
                <div className="flex justify-between items-end mb-4 shrink-0">
                    <h2 className="text-lg font-semibold text-white">What did you resist?</h2>
                    <button 
                        onClick={() => setActiveView('stats')} 
                        className="text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors"
                    >
                        View Insights
                    </button>
                </div>
                
                {/* Scrollable container for vices */}
                <div className="grid grid-cols-1 gap-3 overflow-y-auto hide-scrollbar pb-20 pr-1">
                    {vices.map((vice) => (
                        <button
                            key={vice.id}
                            onClick={() => onViceSelect(vice)}
                            className="group relative flex items-center justify-between p-4 bg-[#1e1035] border border-purple-800/50 rounded-2xl hover:border-amber-400/50 hover:bg-[#251342] transition-all active:scale-95 shrink-0"
                        >
                            <div className="flex items-center space-x-4">
                                <div className={`p-3 rounded-full ${vice.bg} ${vice.color}`}>
                                    {getIconByType(vice.iconType, "w-6 h-6")}
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-slate-100 group-hover:text-white transition-colors">{vice.name}</p>
                                    <p className="text-xs text-purple-300/60 font-medium">
                                        {vice.lastTransactionAmount 
                                            ? `Last Saved: ₹${vice.lastTransactionAmount}` 
                                            : `Avg Cost: ₹${vice.cost}`}
                                    </p>
                                </div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-[#130826] flex items-center justify-center group-hover:bg-amber-400 transition-colors border border-purple-900 group-hover:border-amber-400">
                                <IconArrowRight className="w-4 h-4 text-purple-400 group-hover:text-black transition-colors" />
                            </div>
                        </button>
                    ))}
                    
                    <button 
                        onClick={onOpenModal}
                        className="flex items-center justify-center p-4 border border-dashed border-purple-800/60 rounded-2xl text-purple-400/60 hover:text-purple-200 hover:border-purple-500/50 hover:bg-purple-900/20 transition-all text-sm font-medium shrink-0 mb-4 group"
                    >
                        <span className="mr-2 text-xl font-light bg-purple-900/40 rounded-full w-6 h-6 flex items-center justify-center group-hover:bg-purple-800/60 transition-colors"><IconPlus className="w-4 h-4" /></span>
                        Add Custom Habit
                    </button>

                    <div className="pt-2 pb-6 flex justify-center">
                        <button 
                            onClick={onOpenSinTaxModal}
                            className="flex items-center space-x-2 text-xs font-medium text-red-400/60 hover:text-red-300 transition-colors py-2 px-4 rounded-full hover:bg-red-500/10"
                        >
                            <IconAlertTriangle className="w-3.5 h-3.5" />
                            <span>I slipped up... (Redeem Streak)</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeView;
