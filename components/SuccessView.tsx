
import React from 'react';
import { IconTrendingUp, IconCoin } from './Icons';

interface SuccessViewProps {
    amount: number;
    pointsEarned: number;
}

const SuccessView: React.FC<SuccessViewProps> = ({ amount, pointsEarned }) => {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-amber-400 to-amber-600 z-40 animate-pop-in overflow-hidden">
            <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-spin-slow"></div>
            <div className="text-center space-y-4 relative z-10 p-4">
                <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center mb-6 shadow-2xl animate-bounce">
                    <IconTrendingUp className="w-12 h-12 text-amber-600" />
                </div>
                <div>
                    <h2 className="text-4xl font-bold text-white drop-shadow-md">Switched!</h2>
                    <p className="text-amber-50 font-medium text-xl mt-2">
                        You just turned <span className="font-bold text-white text-2xl block mt-1">₹{amount}</span> into pure Gold.
                    </p>
                </div>
                
                {pointsEarned > 0 && (
                    <div className="mt-6 flex items-center justify-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 animate-pop-in" style={{animationDelay: '0.3s'}}>
                        <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center border border-yellow-300 shadow-sm">
                            <IconCoin className="w-4 h-4 text-yellow-900" />
                        </div>
                        <span className="text-white font-bold text-lg">+{pointsEarned} Coins</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SuccessView;
