import React from 'react';
import { Goal } from '../types';
import { IconPlus, IconTarget, IconCheck } from './Icons';

interface GoalsViewProps {
    goals: Goal[];
    availableBalance: number;
    onAllocate: (goalId: number) => void;
    onOpenModal: () => void;
}

const GoalsView: React.FC<GoalsViewProps> = ({ goals, availableBalance, onAllocate, onOpenModal }) => {
    const totalGoals = goals.length;
    const completedGoals = goals.filter(g => g.currentAmount >= g.targetAmount).length;

    return (
        <div className="p-6 h-full animate-slide-up flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Savings Goals</h2>
                    <p className="text-purple-300/60 text-xs mt-1">{completedGoals} / {totalGoals} Completed</p>
                </div>
                <div className="w-10 h-10 bg-purple-800/30 rounded-full flex items-center justify-center border border-purple-700/50">
                    <IconTarget className="w-5 h-5 text-amber-400" />
                </div>
            </div>

            <div className="bg-[#1e1035] border border-purple-800/50 rounded-2xl p-4 mb-6 relative overflow-hidden">
                <div className="relative z-10">
                    <p className="text-purple-300 text-xs font-medium uppercase tracking-wider mb-1">Available to Allocate</p>
                    <h3 className="text-3xl font-bold text-white">₹{availableBalance.toLocaleString()}</h3>
                </div>
                <div className="absolute right-[-20px] top-[-20px] w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
            </div>

            <div className="flex-1 overflow-y-auto hide-scrollbar space-y-4 pb-20">
                {goals.map(goal => {
                    const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
                    const isCompleted = progress >= 100;
                    const canAllocate = availableBalance > 0 && !isCompleted;

                    return (
                        <div key={goal.id} className="bg-[#130826] border border-purple-800/30 rounded-2xl p-5 relative overflow-hidden">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="font-bold text-white text-lg">{goal.name}</h4>
                                    <p className="text-purple-400/60 text-xs mt-0.5">₹{goal.currentAmount.toLocaleString()} / ₹{goal.targetAmount.toLocaleString()}</p>
                                </div>
                                {isCompleted ? (
                                    <div className="bg-green-500/20 p-1.5 rounded-full">
                                        <IconCheck className="w-4 h-4 text-green-400" />
                                    </div>
                                ) : (
                                    <button 
                                        onClick={() => onAllocate(goal.id)}
                                        disabled={!canAllocate}
                                        className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${canAllocate ? 'bg-amber-500 text-black hover:bg-amber-400 active:scale-95' : 'bg-purple-800/30 text-purple-500 cursor-not-allowed'}`}
                                    >
                                        {canAllocate ? '+ Fund' : 'Fund'}
                                    </button>
                                )}
                            </div>
                            
                            <div className="w-full bg-purple-900/30 h-2.5 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full transition-all duration-700 ease-out ${isCompleted ? 'bg-green-500' : 'bg-gradient-to-r from-amber-600 to-amber-400'}`}
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    );
                })}

                <button 
                    onClick={onOpenModal}
                    className="w-full py-4 border border-dashed border-purple-700/50 rounded-2xl text-purple-400/60 hover:text-purple-200 hover:border-purple-500/50 hover:bg-purple-900/20 transition-all text-sm font-medium flex items-center justify-center group"
                >
                    <IconPlus className="w-5 h-5 mr-2 opacity-50 group-hover:opacity-100" /> Create New Goal
                </button>
            </div>
        </div>
    );
};

export default GoalsView;