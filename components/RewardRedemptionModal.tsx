import React, { useEffect, useState } from 'react';
import { Reward } from '../types';
import { getIconByType, IconCheck, IconCoin } from './Icons';

interface RewardRedemptionModalProps {
    reward: Reward | null;
    onClose: () => void;
}

const RewardRedemptionModal: React.FC<RewardRedemptionModalProps> = ({ reward, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (reward) {
            setIsVisible(true);
        }
    }, [reward]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for fade out animation
    };

    if (!reward && !isVisible) return null;

    return (
        <div className={`absolute inset-0 z-50 flex items-center justify-center bg-[#05020a]/95 backdrop-blur-xl transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            
            {/* Animated Background Effects */}
            <div className="absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-none">
                <div className="absolute w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] animate-pulse-ring"></div>
                <div className="w-[150%] h-[150%] border-[50px] border-dashed border-amber-500/5 rounded-full animate-spin-slow opacity-30"></div>
            </div>

            <div className={`relative w-full max-w-sm p-8 flex flex-col items-center text-center transform transition-all duration-500 ${isVisible ? 'scale-100 translate-y-0' : 'scale-90 translate-y-10'}`}>
                
                {/* Main Reward Icon */}
                <div className="relative mb-8 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-600 rounded-[2rem] rotate-6 blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                    <div className="w-32 h-32 bg-gradient-to-br from-[#2a1b42] to-[#130826] rounded-[2rem] flex items-center justify-center relative z-10 border border-amber-500/30 shadow-2xl shadow-amber-900/40">
                        {getIconByType(reward?.iconType || 'gift', "w-16 h-16 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]")}
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-green-500 text-white p-2.5 rounded-full border-4 border-[#05020a] z-20 shadow-lg animate-bounce-slow">
                        <IconCheck className="w-6 h-6" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-2 mb-8">
                    <h3 className="text-amber-500 font-bold text-xs uppercase tracking-[0.2em]">Reward Unlocked</h3>
                    <h2 className="text-3xl font-extrabold text-white leading-tight">{reward?.title}</h2>
                    <p className="text-purple-300/80 text-sm leading-relaxed max-w-[260px] mx-auto">
                        Success! This item has been added to your inventory.
                    </p>
                </div>

                {/* Cost Summary */}
                <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 mb-8">
                    <span className="text-purple-300 text-xs">Spent:</span>
                    <IconCoin className="w-4 h-4 text-amber-400" />
                    <span className="text-white font-bold text-sm">{reward?.cost}</span>
                </div>

                {/* Action Button */}
                <button 
                    onClick={handleClose}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-lg rounded-2xl shadow-lg shadow-amber-900/30 transform transition-all active:scale-95 hover:shadow-amber-500/20"
                >
                    Claim Reward
                </button>
                
            </div>
        </div>
    );
};

export default RewardRedemptionModal;