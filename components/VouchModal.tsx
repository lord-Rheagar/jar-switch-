
import React, { useState } from 'react';
import { IconX, IconThumbsUp, IconThumbsDown, IconShield } from './Icons';
import { SquadMember } from '../types';

interface VouchModalProps {
    isOpen: boolean;
    onClose: () => void;
    pendingMembers: SquadMember[];
    onVouch: (memberId: string, isVouched: boolean) => void;
}

const VouchModal: React.FC<VouchModalProps> = ({ isOpen, onClose, pendingMembers, onVouch }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!isOpen || pendingMembers.length === 0) return null;

    const currentMember = pendingMembers[currentIndex];
    
    const handleAction = (isVouched: boolean) => {
        onVouch(currentMember.id, isVouched);
        if (currentIndex < pendingMembers.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            // Finished all
            onClose();
            // Reset index for next time
            setTimeout(() => setCurrentIndex(0), 300); 
        }
    };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#0a0512]/95 backdrop-blur-md animate-fade-in">
            <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 bg-white/10 rounded-full text-slate-400 hover:text-white z-50"
            >
                <IconX className="w-5 h-5" />
            </button>

            <div className="w-full max-w-[320px] relative">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white">Sunday Vouch</h2>
                    <p className="text-purple-300/60 text-sm">Verify your squad to unlock the pot.</p>
                </div>

                <div className="relative h-[400px]">
                    {/* Background Stack Effect */}
                    {currentIndex < pendingMembers.length - 1 && (
                        <div className="absolute inset-0 top-3 scale-95 bg-purple-900/20 rounded-3xl border border-purple-800/30"></div>
                    )}
                    
                    {/* Active Card */}
                    <div className="absolute inset-0 bg-[#1e1035] border border-purple-600/50 rounded-3xl shadow-2xl p-6 flex flex-col items-center justify-between animate-pop-in">
                        <div className="flex flex-col items-center w-full">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-lg shadow-purple-900/50 border-4 border-[#1e1035]">
                                {currentMember.avatarInitials}
                            </div>
                            <h3 className="text-xl font-bold text-white">{currentMember.name}</h3>
                            <div className="flex items-center space-x-2 mt-2 bg-purple-900/40 px-3 py-1 rounded-full">
                                <IconShield className="w-3 h-3 text-purple-400" />
                                <span className="text-xs text-purple-300">Streak: 5 Days</span>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-lg font-medium text-white">Has {currentMember.name} stayed clean this week?</p>
                            <p className="text-xs text-purple-400 mt-2">Be honest. The squad pot depends on it.</p>
                        </div>

                        <div className="flex space-x-4 w-full">
                            <button 
                                onClick={() => handleAction(false)}
                                className="flex-1 py-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-2xl flex flex-col items-center justify-center group transition-all active:scale-95"
                            >
                                <IconThumbsDown className="w-6 h-6 text-red-500 mb-1 group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-bold text-red-400 uppercase tracking-wide">Call Out</span>
                            </button>
                            <button 
                                onClick={() => handleAction(true)}
                                className="flex-1 py-4 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 rounded-2xl flex flex-col items-center justify-center group transition-all active:scale-95"
                            >
                                <IconThumbsUp className="w-6 h-6 text-green-500 mb-1 group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-bold text-green-400 uppercase tracking-wide">Vouch</span>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="text-center mt-6 text-purple-500/40 text-xs font-medium">
                    {pendingMembers.length - currentIndex} members remaining
                </div>
            </div>
        </div>
    );
};

export default VouchModal;