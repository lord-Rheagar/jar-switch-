import React, { useState } from 'react';
import { IconX, IconTarget } from './Icons';
import { Goal } from '../types';

interface AddGoalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (goal: Goal) => void;
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({ isOpen, onClose, onAdd }) => {
    const [name, setName] = useState('');
    const [target, setTarget] = useState('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!name || !target) return;
        
        const newGoal: Goal = {
            id: Date.now(),
            name: name,
            targetAmount: parseFloat(target),
            currentAmount: 0
        };
        
        onAdd(newGoal);
        setName('');
        setTarget('');
    };

    return (
        <div className="absolute inset-0 z-50 flex items-end sm:items-center justify-center bg-[#0a0512]/90 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-[340px] mb-20 sm:mb-0 bg-[#1e1035] border border-purple-800 p-6 rounded-3xl shadow-2xl animate-pop-in relative shadow-purple-900/20">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 bg-purple-900/50 rounded-full text-purple-300 hover:text-white"
                >
                    <IconX className="w-4 h-4" />
                </button>

                <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-3 text-amber-400">
                        <IconTarget className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white">New Savings Goal</h3>
                    <p className="text-purple-300/60 text-xs mt-1">What are you saving for?</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-purple-400/70 uppercase tracking-wider ml-1">Goal Name</label>
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. New Headphones, Trip"
                            className="w-full bg-[#130826] border border-purple-800/50 rounded-xl p-3 mt-1 text-white placeholder-purple-700 focus:outline-none focus:border-amber-400 transition-colors"
                            autoFocus
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-purple-400/70 uppercase tracking-wider ml-1">Target Amount (₹)</label>
                        <input 
                            type="number" 
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                            placeholder="e.g. 5000"
                            className="w-full bg-[#130826] border border-purple-800/50 rounded-xl p-3 mt-1 text-white placeholder-purple-700 focus:outline-none focus:border-amber-400 transition-colors"
                        />
                    </div>
                    <button 
                        onClick={handleSubmit}
                        disabled={!name || !target}
                        className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3.5 rounded-xl mt-2 transition-all active:scale-95 border border-amber-400/50 shadow-lg shadow-amber-900/40"
                    >
                        Create Goal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddGoalModal;