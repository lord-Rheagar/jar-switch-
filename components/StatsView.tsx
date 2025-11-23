
import React from 'react';
import { IconArrowRight, IconTrendingUp, IconZap, IconShield } from './Icons';
import { ViewType, Transaction } from '../types';

interface StatsViewProps {
    setActiveView: (view: ViewType) => void;
    totalSaved: number;
    transactions: Transaction[];
}

const StatsView: React.FC<StatsViewProps> = ({ setActiveView, totalSaved, transactions }) => {
    // Mock data for the chart to simulate activity
    const weeklyData = [40, 70, 20, 80, 40, 10, 90];
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const projectedSavings = Math.round(totalSaved * 52); // Very rough projection based on "current total as a weekly avg" logic for demo

    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="h-full animate-slide-up flex flex-col">
            <div className="flex items-center p-6 pb-2 shrink-0">
                <button 
                    onClick={() => setActiveView('home')} 
                    className="p-2 bg-[#1e1035] border border-purple-800 rounded-full mr-4 hover:bg-[#251342] transition-colors"
                >
                    <IconArrowRight className="w-5 h-5 rotate-180 text-purple-300" />
                </button>
                <h2 className="text-xl font-bold text-white">Your Anti-Spend</h2>
            </div>
            
            <div className="overflow-y-auto hide-scrollbar p-6 pt-4 pb-20 space-y-6">
                
                {/* Weekly Chart */}
                <div className="bg-[#1e1035] border border-purple-800/50 rounded-3xl p-6">
                    <h3 className="text-sm text-purple-300 mb-6 font-medium">This Week's Wins</h3>
                    <div className="flex items-end justify-between h-40 space-x-2">
                        {weeklyData.map((h, i) => (
                            <div key={i} className="flex flex-col items-center flex-1 group cursor-pointer">
                                <div className="relative w-full h-full flex items-end">
                                    <div 
                                        style={{height: `${h}%`}} 
                                        className={`w-full rounded-t-md transition-all duration-500 ${h > 60 ? 'bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]' : 'bg-[#3d1b5e] group-hover:bg-[#522580]'}`}
                                    ></div>
                                </div>
                                <span className="text-xs text-purple-400/50 mt-2 font-medium">{days[i]}</span>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Projection Card */}
                <div className="bg-[#1e1035] border border-purple-800/50 rounded-xl p-4 flex items-center justify-between">
                     <div>
                         <p className="text-[10px] uppercase tracking-wider text-purple-400/60 font-bold">1 Year Projection</p>
                         <p className="text-xl font-bold text-white mt-1">₹{projectedSavings.toLocaleString()}</p>
                     </div>
                     <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                         <IconTrendingUp className="text-green-500 w-5 h-5" />
                     </div>
                 </div>

                 {/* Recent Transactions List */}
                 <div>
                    <h3 className="text-white font-bold mb-4 flex items-center">
                        Recent Activity 
                        <span className="ml-2 text-[10px] bg-purple-800/50 text-purple-300 px-2 py-0.5 rounded-full">{transactions.length}</span>
                    </h3>
                    <div className="space-y-3">
                        {transactions.length === 0 ? (
                            <div className="text-center py-8 text-purple-400/40 text-sm">No recent activity</div>
                        ) : (
                            transactions.map(tx => (
                                <div key={tx.id} className="bg-[#130826] border border-purple-800/30 rounded-2xl p-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'sin-tax' ? 'bg-cyan-900/30 text-cyan-400' : 'bg-amber-500/10 text-amber-400'}`}>
                                            {tx.type === 'sin-tax' ? <IconShield className="w-5 h-5" /> : <IconZap className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-200 text-sm">{tx.viceName}</p>
                                            <p className="text-xs text-purple-400/60">{formatDate(tx.date)}</p>
                                        </div>
                                    </div>
                                    <div className={`font-bold ${tx.type === 'sin-tax' ? 'text-cyan-400' : 'text-green-400'}`}>
                                        + ₹{tx.amount}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default StatsView;